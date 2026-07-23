import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  collection,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

import PageLayout from "../../components/PageLayout/PageLayout";
import SEO from "../../components/SEO/SEO";

import "./BlogsPage.css";

import { importBlogs } from "./blogimport";


/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL = "https://urbanhomey.com";

const DEFAULT_BLOG_IMAGE = `${SITE_URL}/mainlogo.jpeg`;


/* =========================================================
   HELPERS
========================================================= */

const getTimestampValue = (value) => {
  if (!value) return 0;

  if (typeof value?.toMillis === "function") {
    return value.toMillis();
  }

  if (typeof value?.seconds === "number") {
    return value.seconds * 1000;
  }

  const parsedDate = new Date(value).getTime();

  return Number.isNaN(parsedDate) ? 0 : parsedDate;
};


const getISODate = (blog) => {
  if (blog?.createdAt?.toDate) {
    return blog.createdAt.toDate().toISOString();
  }

  if (blog?.createdAt?.seconds) {
    return new Date(
      blog.createdAt.seconds * 1000
    ).toISOString();
  }

  if (blog?.date) {
    const parsedDate = new Date(blog.date);

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString();
    }
  }

  return undefined;
};


const getBlogPath = (blog) => {
  if (!blog?.slug) {
    return null;
  }

  return `/blog/${encodeURIComponent(blog.slug)}`;
};


const getBlogURL = (blog) => {
  const path = getBlogPath(blog);

  return path ? `${SITE_URL}${path}` : null;
};


const getBlogImage = (blog) => {
  return blog?.image || DEFAULT_BLOG_IMAGE;
};


/* =========================================================
   COMPONENT
========================================================= */

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =======================================================
     FETCH BLOGS
  ======================================================= */

  useEffect(() => {
    let isMounted = true;


    const fetchBlogs = async () => {
      setLoading(true);
      setError("");


      try {
        let snapshot;


        /*
         * First try server-side Firestore ordering.
         *
         * If older blog documents do not contain createdAt,
         * fall back to fetching all blogs and sorting locally.
         */

        try {
          const blogsQuery = query(
            collection(db, "blogs"),
            orderBy("createdAt", "desc")
          );

          snapshot = await getDocs(blogsQuery);
        } catch (queryError) {
          console.warn(
            "Ordered blog query failed. Falling back to local sorting:",
            queryError
          );

          snapshot = await getDocs(
            collection(db, "blogs")
          );
        }


        const blogsData = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));


        blogsData.sort(
          (a, b) =>
            getTimestampValue(b.createdAt) -
            getTimestampValue(a.createdAt)
        );


        if (isMounted) {
          setBlogs(blogsData);
        }

      } catch (fetchError) {
        console.error(
          "Error fetching blogs:",
          fetchError
        );


        if (isMounted) {
          setError(
            "Unable to load UrbanHomey blogs right now. Please try again later."
          );
        }

      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };


    fetchBlogs();


    return () => {
      isMounted = false;
    };
  }, []);


  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const structuredData = useMemo(() => {
    const blogItems = blogs
      .filter((blog) => blog?.slug && blog?.title)
      .map((blog, index) => {
        const blogURL = getBlogURL(blog);

        const datePublished = getISODate(blog);


        return {
          "@type": "ListItem",

          position: index + 1,

          item: {
            "@type": "BlogPosting",

            headline: blog.title,

            url: blogURL,

            mainEntityOfPage: blogURL,

            ...(blog.summary && {
              description: blog.summary,
            }),

            ...(blog.image && {
              image: blog.image,
            }),

            ...(datePublished && {
              datePublished,
            }),

            ...(blog.author && {
              author: {
                "@type": "Person",
                name: blog.author,
              },
            }),

            publisher: {
              "@type": "Organization",

              name: "UrbanHomey",

              url: SITE_URL,

              logo: {
                "@type": "ImageObject",
                url: DEFAULT_BLOG_IMAGE,
              },
            },
          },
        };
      });


    return {
      "@context": "https://schema.org",

      "@graph": [
        {
          "@type": "CollectionPage",

          "@id": `${SITE_URL}/blogs#webpage`,

          url: `${SITE_URL}/blogs`,

          name:
            "UrbanHomey Blogs - Flatmate, Roommate & Rental Guides",

          description:
            "Explore UrbanHomey blogs for flatmate finding tips, roommate guides, rental advice, shared living tips, safety information and room-finding guides across India.",

          isPartOf: {
            "@type": "WebSite",

            "@id": `${SITE_URL}/#website`,

            url: SITE_URL,

            name: "UrbanHomey",
          },

          about: [
            {
              "@type": "Thing",
              name: "Flatmates",
            },

            {
              "@type": "Thing",
              name: "Roommates",
            },

            {
              "@type": "Thing",
              name: "Shared Living",
            },

            {
              "@type": "Thing",
              name: "Rental Housing",
            },
          ],

          mainEntity: {
            "@type": "ItemList",

            numberOfItems: blogItems.length,

            itemListElement: blogItems,
          },
        },


        {
          "@type": "BreadcrumbList",

          "@id": `${SITE_URL}/blogs#breadcrumb`,

          itemListElement: [
            {
              "@type": "ListItem",

              position: 1,

              name: "Home",

              item: SITE_URL,
            },

            {
              "@type": "ListItem",

              position: 2,

              name: "Blogs",

              item: `${SITE_URL}/blogs`,
            },
          ],
        },
      ],
    };

  }, [blogs]);


  /* =======================================================
     PAGE CONTENT
  ======================================================= */

  const pageContent = (
    <>
      <SEO
        title="UrbanHomey Blogs | Flatmate, Roommate & Rental Guides India"

        description="Read UrbanHomey blogs for flatmate finding tips, roommate advice, room rental guides, safety tips, budgeting advice and shared living experiences across India."

        canonical={`${SITE_URL}/blogs`}

        keywords={[
          "flatmate blogs India",
          "roommate guides India",
          "find flatmate India",
          "find roommate India",
          "room rental tips India",
          "shared living tips",
          "flatmate safety tips",
          "roommate compatibility",
          "rental advice India",
          "UrbanHomey blogs",
        ]}

        image={DEFAULT_BLOG_IMAGE}

        type="website"

        structuredData={structuredData}
      />


      <main
        className="blogs-page"
        id="main-content"
      >

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="blogs-page-header">

          <span className="blogs-page-eyebrow">
            UrbanHomey Resources
          </span>
{/* <button onClick={importBlogs}>
  Import Blogs
</button> */}


          <h1>
            Flatmate, Roommate &amp; Rental Guides
          </h1>


          <p>
            Discover practical flatmate tips, roommate guides,
            rental advice, safety information, budgeting ideas,
            and shared-living experiences from UrbanHomey.
          </p>

        </header>


        {/* =================================================
            LOADING STATE
        ================================================= */}

        {loading && (

          <section
            className="blogs-page-status"
            aria-live="polite"
            aria-busy="true"
          >

            <div
              className="blogs-loading-spinner"
              aria-hidden="true"
            />


            <h2>
              Loading UrbanHomey Blogs
            </h2>


            <p>
              Fetching our latest flatmate, roommate,
              rental and shared-living guides.
            </p>

          </section>

        )}


        {/* =================================================
            ERROR STATE
        ================================================= */}

        {!loading && error && (

          <section
            className="blogs-page-status blogs-page-error"
            role="alert"
          >

            <h2>
              We Couldn't Load the Blogs
            </h2>


            <p>
              {error}
            </p>


            <button
              type="button"
              className="blogs-retry-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>

          </section>

        )}


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!loading &&
          !error &&
          blogs.length === 0 && (

            <section className="blogs-page-status">

              <h2>
                New Guides Are Coming Soon
              </h2>


              <p>
                UrbanHomey is preparing more guides about
                finding flatmates, roommates, rooms,
                rentals and better shared-living experiences.
              </p>


              <Link
                to="/"
                className="blogs-home-link"
              >
                Explore UrbanHomey
              </Link>

            </section>

          )}


        {/* =================================================
            BLOG GRID
        ================================================= */}

        {!loading &&
          !error &&
          blogs.length > 0 && (

            <section
              className="blogs-list-section"
              aria-labelledby="latest-blogs-heading"
            >

              <div className="blogs-list-heading">

                <h2 id="latest-blogs-heading">
                  Latest Flatmate &amp; Rental Guides
                </h2>


                <p>
                  Browse our latest articles about finding
                  compatible flatmates, renting rooms safely,
                  managing shared expenses and improving
                  your shared-living experience.
                </p>

              </div>


              <div className="blogs-page-grid">

                {blogs.map((blog, index) => {

                  const blogPath =
                    getBlogPath(blog);


                  const imageURL =
                    getBlogImage(blog);


                  const category =
                    blog.category ||
                    "Flatmate Guide";


                  const title =
                    blog.title ||
                    "UrbanHomey Guide";


                  const summary =
                    blog.summary ||
                    "Explore flatmate, roommate, rental and shared-living advice from UrbanHomey.";


                  return (

                    <article
                      className="blog-page-card"
                      key={blog.id}
                    >

                      {/* =====================================
                          IMAGE
                      ===================================== */}

                      <div className="blog-page-image">

                        {blogPath ? (

                          <Link
                            to={blogPath}
                            aria-label={`Read ${title}`}
                            className="blog-page-image-link"
                          >

                            <img
                              src={imageURL}
                              alt={`${title} - UrbanHomey flatmate and rental guide`}
                              loading={
                                index < 3
                                  ? "eager"
                                  : "lazy"
                              }
                              fetchPriority={
                                index === 0
                                  ? "high"
                                  : "auto"
                              }
                              decoding="async"
                              width="640"
                              height="400"
                            />

                          </Link>

                        ) : (

                          <img
                            src={imageURL}
                            alt={`${title} - UrbanHomey flatmate and rental guide`}
                            loading="lazy"
                            decoding="async"
                            width="640"
                            height="400"
                          />

                        )}


                        <span className="blog-page-category">
                          {category}
                        </span>

                      </div>


                      {/* =====================================
                          CONTENT
                      ===================================== */}

                      <div className="blog-page-content">

                        <h3>

                          {blogPath ? (

                            <Link to={blogPath}>
                              {title}
                            </Link>

                          ) : (

                            title

                          )}

                        </h3>


                        <p className="blog-page-summary">
                          {summary}
                        </p>


                        {/* ===================================
                            AUTHOR
                        =================================== */}

                        {(blog.author ||
                          blog.authorLocation) && (

                          <div className="blog-page-author">

                            {blog.author && (

                              <span className="author-name">
                                {blog.author}
                              </span>

                            )}


                            {blog.authorLocation && (

                              <span className="author-location">
                                {blog.authorLocation}
                              </span>

                            )}

                          </div>

                        )}


                        {/* ===================================
                            META DATA
                        =================================== */}

                        {(blog.date ||
                          blog.readTime) && (

                          <div className="blog-page-meta">

                            {blog.date && (

                              <time
                                dateTime={
                                  getISODate(blog)
                                }
                              >
                                {blog.date}
                              </time>

                            )}


                            {blog.date &&
                              blog.readTime && (

                                <span
                                  aria-hidden="true"
                                >
                                  •
                                </span>

                              )}


                            {blog.readTime && (

                              <span>
                                {blog.readTime}
                              </span>

                            )}

                          </div>

                        )}


                        {/* ===================================
                            CRAWLABLE BLOG LINK
                        =================================== */}

                        {blogPath && (

                          <Link
                            className="blog-page-btn"
                            to={blogPath}
                            aria-label={`Read more about ${title}`}
                          >
                            Read Full Guide

                            <span aria-hidden="true">
                              →
                            </span>
                          </Link>

                        )}

                      </div>

                    </article>

                  );

                })}

              </div>

            </section>

          )}


        {/* =================================================
            INTERNAL SEO LINKS
        ================================================= */}

        <nav
          className="blogs-internal-links"
          aria-label="Explore UrbanHomey flatmate and room pages"
        >

          <div className="blogs-internal-links-copy">

            <span className="blogs-internal-eyebrow">
              Explore UrbanHomey
            </span>


            <h2>
              Find Flatmates &amp; Rooms Across India
            </h2>


            <p>
              Start exploring compatible flatmates,
              roommates and rooms in popular Indian cities.
            </p>

          </div>


          <div className="blogs-internal-links-grid">

            <Link to="/find-flatmate-in-pune">
              Find Flatmates in Pune
            </Link>


            <Link to="/find-flatmate-in-bangalore">
              Find Flatmates in Bangalore
            </Link>


            <Link to="/find-flatmate-in-hyderabad">
              Find Flatmates in Hyderabad
            </Link>


            <Link to="/find-flatmate-in-mumbai">
              Find Flatmates in Mumbai
            </Link>


            <Link to="/find-room-in-pune">
              Find Rooms in Pune
            </Link>


            <Link to="/find-room-in-bangalore">
              Find Rooms in Bangalore
            </Link>


            <Link to="/cities">
              Explore All Cities
            </Link>

          </div>

        </nav>

      </main>
    </>
  );


  /* =======================================================
     PAGE LAYOUT
  ======================================================= */

  return (
    <PageLayout>
      {pageContent}
    </PageLayout>
  );
}


export default BlogsPage;