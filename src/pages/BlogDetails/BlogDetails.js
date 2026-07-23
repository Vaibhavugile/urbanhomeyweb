import React, { useEffect, useMemo, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../firebase";

import PageLayout from "../../components/PageLayout/PageLayout";
import SEO from "../../components/SEO/SEO";

import "./BlogDetails.css";


/* =========================================================
   WEBSITE CONSTANTS
========================================================= */

const SITE_URL = "https://www.urbanhomey.com";
const SITE_NAME = "UrbanHomey";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;


/* =========================================================
   HELPERS
========================================================= */

/*
 * Convert Firestore Timestamp, Date, timestamp-like object,
 * or date string into ISO 8601.
 */

function getISODate(value) {
  if (!value) {
    return undefined;
  }

  try {
    if (typeof value?.toDate === "function") {
      return value.toDate().toISOString();
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    if (typeof value === "object" && value.seconds) {
      return new Date(value.seconds * 1000).toISOString();
    }

    const parsedDate = new Date(value);

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString();
    }
  } catch (error) {
    console.error("Unable to convert blog date:", error);
  }

  return undefined;
}


/*
 * Convert relative/local image paths to absolute URLs.
 */

function getAbsoluteUrl(value, fallback = DEFAULT_IMAGE) {
  if (!value) {
    return fallback;
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}


/*
 * Create a clean description for search engines.
 */

function createMetaDescription(blog) {
  const source =
    blog?.seoDescription ||
    blog?.summary ||
    blog?.excerpt ||
    blog?.content ||
    blog?.full ||
    "";

  const cleanText = source
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanText) {
    return "Read flatmate tips, roommate guides, rental advice and shared living insights from UrbanHomey.";
  }

  if (cleanText.length <= 160) {
    return cleanText;
  }

  return `${cleanText.slice(0, 157).trim()}...`;
}


/*
 * Convert visible blog date to a useful display value.
 */

function getDisplayDate(blog) {
  if (blog?.date) {
    return blog.date;
  }

  const isoDate = getISODate(
    blog?.publishedAt ||
    blog?.createdAt
  );

  if (!isoDate) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}


/* =========================================================
   BLOG CONTENT RENDERER
========================================================= */

function BlogContent({ content }) {
  if (!content) {
    return null;
  }

  return content.split("\n").map((line, index) => {
    const text = line.trim();

    if (!text) {
      return null;
    }


    /* =====================================================
       BULLET POINTS
    ===================================================== */

    if (
      text.startsWith("✓") ||
      text.startsWith("✗") ||
      text.startsWith("•")
    ) {
      const isNegative = text.startsWith("✗");

      return (
        <div
          key={`${index}-${text}`}
          className={`blog-point ${
            isNegative ? "negative" : "positive"
          }`}
        >
          {text}
        </div>
      );
    }


    /* =====================================================
       HEADINGS
    ===================================================== */

    const headingPrefixes = [
      "Benefits",
      "Advantages",
      "Conclusion",
      "Why",
      "How",
      "Future",
      "Common",
      "Best",
      "Popular",
      "Checklist",
      "Mistake",
      "Area",
      "Location",
      "Tips",
      "Things",
      "Steps",
      "Guide",
      "Safety",
      "Budget",
    ];

    const isHeading =
      text.endsWith(":") ||
      headingPrefixes.some((prefix) =>
        text.toLowerCase().startsWith(prefix.toLowerCase())
      );

    if (isHeading) {
      return (
        <h2
          key={`${index}-${text}`}
          className="blog-heading"
        >
          {text}
        </h2>
      );
    }


    /* =====================================================
       NORMAL PARAGRAPH
    ===================================================== */

    return (
      <p key={`${index}-${text}`}>
        {text}
      </p>
    );
  });
}


/* =========================================================
   LOADING PAGE
========================================================= */

function BlogLoadingPage() {
  return (
    <PageLayout>
      <SEO
        title="Loading Article | UrbanHomey"
        description="Loading UrbanHomey article."
        url={`${SITE_URL}/blogs`}
        noindex
      />

      <main className="blog-not-found">
        <h1>Loading blog...</h1>
      </main>
    </PageLayout>
  );
}


/* =========================================================
   BLOG NOT FOUND PAGE
========================================================= */

function BlogNotFoundPage({ slug }) {
  const requestedUrl = `${SITE_URL}/blog/${encodeURIComponent(
    slug || ""
  )}`;

  return (
    <PageLayout>
      <SEO
        title="Blog Not Found | UrbanHomey"
        description="The requested UrbanHomey blog article could not be found."
        url={requestedUrl}
        noindex
      />

      <main className="blog-not-found">
        <h1>Blog Not Found</h1>

        <p>
          The article you are looking for may have been removed,
          renamed, or does not exist.
        </p>

        <Link to="/blogs">
          Back to Blogs
        </Link>
      </main>
    </PageLayout>
  );
}


/* =========================================================
   BLOG DETAILS
========================================================= */

function BlogDetails() {
  const { slug } = useParams();

  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);

  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  /* =======================================================
     FETCH BLOG
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      setBlog(null);
      setRelatedBlogs([]);

      try {
        /*
         * Fetch current blog.
         *
         * limit(1) prevents unnecessary document reads
         * if duplicate slugs accidentally exist.
         */

        const blogQuery = query(
          collection(db, "blogs"),
          where("slug", "==", slug),
          limit(1)
        );

        const snapshot = await getDocs(blogQuery);

        if (!isMounted) {
          return;
        }

        if (snapshot.empty) {
          setBlog(null);
          return;
        }

        const blogDocument = snapshot.docs[0];

        const blogData = {
          id: blogDocument.id,
          ...blogDocument.data(),
        };

        setBlog(blogData);


        /*
         * Fetch related articles from the same category.
         *
         * Fetching 4 documents gives us room to remove
         * the current article and still show up to 3.
         */

        if (blogData.category) {
          const relatedQuery = query(
            collection(db, "blogs"),
            where("category", "==", blogData.category),
            limit(4)
          );

          const relatedSnapshot = await getDocs(relatedQuery);

          if (!isMounted) {
            return;
          }

          const related = relatedSnapshot.docs
            .map((document) => ({
              id: document.id,
              ...document.data(),
            }))
            .filter(
              (item) =>
                item.id !== blogData.id &&
                item.slug
            )
            .slice(0, 3);

          setRelatedBlogs(related);
        }
      } catch (fetchError) {
        console.error(
          "Error fetching blog:",
          fetchError
        );

        if (isMounted) {
          setError(
            "Unable to load this article right now."
          );

          setBlog(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlog();

    return () => {
      isMounted = false;
    };
  }, [slug]);


  /* =======================================================
     SEO VALUES
  ======================================================= */

  const seoData = useMemo(() => {
    if (!blog) {
      return null;
    }

    const canonicalUrl =
      `${SITE_URL}/blog/${encodeURIComponent(blog.slug)}`;

    const title =
      blog.seoTitle ||
      `${blog.title} | UrbanHomey`;

    const description =
      createMetaDescription(blog);

    const image =
      getAbsoluteUrl(blog.image);

    const publishedDate =
      getISODate(
        blog.publishedAt ||
        blog.createdAt
      );

    const modifiedDate =
      getISODate(
        blog.updatedAt ||
        blog.modifiedAt ||
        blog.publishedAt ||
        blog.createdAt
      );

    return {
      canonicalUrl,
      title,
      description,
      image,
      publishedDate,
      modifiedDate,
    };
  }, [blog]);


  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const schema = useMemo(() => {
    if (!blog || !seoData) {
      return null;
    }

    const blogPosting = {
      "@type": "BlogPosting",

      "@id": `${seoData.canonicalUrl}#article`,

      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": seoData.canonicalUrl,
      },

      headline: blog.title,

      description: seoData.description,

      image: [
        seoData.image,
      ],

      author: {
        "@type": "Person",
        name: blog.author || SITE_NAME,
      },

      publisher: {
        "@type": "Organization",

        "@id": `${SITE_URL}/#organization`,

        name: SITE_NAME,

        logo: {
          "@type": "ImageObject",

          url: `${SITE_URL}/mainlogo.png`,
        },
      },

      articleSection:
        blog.category || "Flatmate Guides",

      inLanguage: "en-IN",
    };


    /*
     * Only add dates when valid date information exists.
     */

    if (seoData.publishedDate) {
      blogPosting.datePublished =
        seoData.publishedDate;
    }

    if (seoData.modifiedDate) {
      blogPosting.dateModified =
        seoData.modifiedDate;
    }


    const breadcrumbSchema = {
      "@type": "BreadcrumbList",

      "@id":
        `${seoData.canonicalUrl}#breadcrumb`,

      itemListElement: [
        {
          "@type": "ListItem",

          position: 1,

          name: "Home",

          item: `${SITE_URL}/`,
        },

        {
          "@type": "ListItem",

          position: 2,

          name: "Blogs",

          item: `${SITE_URL}/blogs`,
        },

        {
          "@type": "ListItem",

          position: 3,

          name: blog.title,

          item: seoData.canonicalUrl,
        },
      ],
    };


    return {
      "@context": "https://schema.org",

      "@graph": [
        blogPosting,
        breadcrumbSchema,
      ],
    };
  }, [blog, seoData]);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return <BlogLoadingPage />;
  }


  /* =======================================================
     ERROR / NOT FOUND
  ======================================================= */

  if (error || !blog || !seoData) {
    return (
      <BlogNotFoundPage slug={slug} />
    );
  }


  /* =======================================================
     BLOG CONTENT
  ======================================================= */

  const articleContent =
    blog.content ||
    blog.full ||
    "";

  const displayDate =
    getDisplayDate(blog);


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <PageLayout>

      {/* ===================================================
          DYNAMIC BLOG SEO
      =================================================== */}

      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={
          blog.seoKeywords ||
          blog.keywords ||
          `${blog.category || "flatmate tips"}, flatmate finder, roommate finder, shared living, UrbanHomey`
        }
        url={seoData.canonicalUrl}
        image={seoData.image}
        type="article"
        schema={schema}
      />


      {/* ===================================================
          MAIN ARTICLE
      =================================================== */}

      <main className="blog-details-page">

        <article>

          {/* =================================================
              HERO
          ================================================= */}

          <header className="blog-hero">

            <img
              src={seoData.image}
              alt={blog.imageAlt || blog.title}
              width="1200"
              height="630"
              fetchPriority="high"
              decoding="async"
            />

            <div className="blog-hero-overlay">

              {blog.category && (
                <span className="blog-tag">
                  {blog.category}
                </span>
              )}

              <h1>
                {blog.title}
              </h1>


              {/* =============================================
                  ARTICLE INFORMATION
              ============================================= */}

              <div className="blog-info">

                {blog.author && (
                  <span>
                    {blog.author}
                  </span>
                )}

                {blog.authorLocation && (
                  <>
                    <span aria-hidden="true">
                      •
                    </span>

                    <span>
                      {blog.authorLocation}
                    </span>
                  </>
                )}

                {displayDate && (
                  <>
                    <span aria-hidden="true">
                      •
                    </span>

                    <time
                      dateTime={
                        seoData.publishedDate ||
                        undefined
                      }
                    >
                      {displayDate}
                    </time>
                  </>
                )}

                {blog.readTime && (
                  <>
                    <span aria-hidden="true">
                      •
                    </span>

                    <span>
                      {blog.readTime}
                    </span>
                  </>
                )}

              </div>

            </div>

          </header>


          {/* =================================================
              ARTICLE CONTENT
          ================================================= */}

          <div className="article-container">

            {blog.summary && (
              <p className="blog-article-summary">
                {blog.summary}
              </p>
            )}

            <BlogContent
              content={articleContent}
            />

          </div>

        </article>


        {/* ===================================================
            RELATED ARTICLES
        =================================================== */}

        {relatedBlogs.length > 0 && (

          <section
            className="related-blogs"
            aria-labelledby="related-blogs-heading"
          >

            <h2 id="related-blogs-heading">
              Related Flatmate & Rental Guides
            </h2>


            <div className="related-grid">

              {relatedBlogs.map((item) => (

                <article
                  key={item.id}
                  className="related-card"
                >

                  <Link
                    to={`/blog/${item.slug}`}
                    className="related-card-link"
                  >

                    <img
                      src={getAbsoluteUrl(item.image)}
                      alt={
                        item.imageAlt ||
                        item.title
                      }
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                    />


                    <div className="related-card-content">

                      {item.category && (
                        <span>
                          {item.category}
                        </span>
                      )}

                      <h3>
                        {item.title}
                      </h3>

                      {item.readTime && (
                        <p>
                          {item.readTime}
                        </p>
                      )}

                    </div>

                  </Link>

                </article>

              ))}

            </div>

          </section>

        )}


        {/* ===================================================
            INTERNAL LINK CTA
        =================================================== */}

        <section className="blog-cta">

          <h2>
            Looking for a Compatible Flatmate?
          </h2>

          <p>
            Discover flatmates and roommates based on
            location, budget, lifestyle preferences and
            daily habits with UrbanHomey.
          </p>


          <div className="blog-cta-actions">

            <Link
              to="/matches"
              className="blog-cta-primary"
            >
              Find Flatmates
            </Link>


            <Link
              to="/list-room"
              className="blog-cta-secondary"
            >
              List Your Room
            </Link>

          </div>

        </section>


        {/* ===================================================
            BACK TO BLOGS INTERNAL LINK
        =================================================== */}

        <nav
          className="blog-back-navigation"
          aria-label="Blog navigation"
        >

          <Link to="/blogs">
            ← View All Flatmate & Rental Guides
          </Link>

        </nav>

      </main>

    </PageLayout>
  );
}

export default BlogDetails;