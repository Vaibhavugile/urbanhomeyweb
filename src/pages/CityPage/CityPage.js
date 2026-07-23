import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase";

import SEO from "../../components/SEO/SEO";
import PageLayout from "../../components/PageLayout/PageLayout";

import {
  cityList,
  getCityBySlug,
} from "../../data/cities";

import "./CityPage.css";

const SITE_URL = "https://www.urbanhomey.com";

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

const normalizeText = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase();

const getBlogTimestamp = (blog) => {
  if (blog?.createdAt?.seconds) {
    return blog.createdAt.seconds;
  }

  if (blog?.createdAt?.toMillis) {
    return Math.floor(blog.createdAt.toMillis() / 1000);
  }

  return 0;
};

/* =========================================================
   CITY PAGE
========================================================= */

function CityPage() {
  const { citySlug } = useParams();

  const city = useMemo(
    () => getCityBySlug(citySlug),
    [citySlug]
  );

  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

  /* =======================================================
     LOAD CITY-RELATED BLOGS
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchRelatedBlogs = async () => {
      if (!city) {
        setBlogsLoading(false);
        return;
      }

      setBlogsLoading(true);

      try {
        const snapshot = await getDocs(
          collection(db, "blogs")
        );

        const allBlogs = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        const cityName = normalizeText(city.name);

        const matchingBlogs = allBlogs
          .filter((blog) => {
            const searchableText = [
              blog.title,
              blog.summary,
              blog.category,
              blog.authorLocation,
              blog.content,
              blog.full,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return searchableText.includes(cityName);
          })
          .sort(
            (a, b) =>
              getBlogTimestamp(b) -
              getBlogTimestamp(a)
          )
          .slice(0, 3);

        if (isMounted) {
          setRelatedBlogs(matchingBlogs);
        }
      } catch (error) {
        console.error(
          `Error loading blogs for ${city.name}:`,
          error
        );

        if (isMounted) {
          setRelatedBlogs([]);
        }
      } finally {
        if (isMounted) {
          setBlogsLoading(false);
        }
      }
    };

    fetchRelatedBlogs();

    return () => {
      isMounted = false;
    };
  }, [city]);

  /* =======================================================
     INVALID CITY
  ======================================================= */

  if (!city) {
    return <Navigate to="/cities" replace />;
  }

  /* =======================================================
     URLs
  ======================================================= */

  const canonicalUrl =
    `${SITE_URL}/city/${city.slug}`;

  const findRoomUrl =
    `/find-room?city=${encodeURIComponent(city.name)}`;

  const listRoomUrl =
    `/list-room?city=${encodeURIComponent(city.name)}`;

  /* =======================================================
     FAQ DATA
  ======================================================= */

  const faqs = [
    {
      question:
        `How can I find flatmates in ${city.name}?`,

      answer:
        `Use UrbanHomey to explore compatible flatmates and roommates in ${city.name}. You can compare people based on location, budget, lifestyle preferences and shared-living requirements before deciding who may be a suitable match.`,
    },

    {
      question:
        `Can I find rooms for rent in ${city.name} on UrbanHomey?`,

      answer:
        `UrbanHomey helps people explore rooms, shared accommodation and potential flatmates in ${city.name}. Availability may vary by area and depends on active listings published by users.`,
    },

    {
      question:
        `Which areas are popular for finding shared accommodation in ${city.name}?`,

      answer:
        `Popular areas represented on this UrbanHomey city guide include ${city.areas
          .slice(0, 6)
          .join(", ")}. The right location depends on your workplace, college, commute, rental budget and lifestyle preferences.`,
    },

    {
      question:
        `How should I choose a compatible roommate in ${city.name}?`,

      answer:
        `Compare more than rent and location. Discuss cleanliness, work schedules, food preferences, smoking and drinking habits, guests, pets, shared expenses and expectations about household responsibilities before moving in together.`,
    },

    {
      question:
        `Can students and working professionals use UrbanHomey in ${city.name}?`,

      answer:
        `Yes. UrbanHomey is designed to help students, working professionals and other people looking for compatible flatmates, roommates, rooms and shared-living opportunities.`,
    },
  ];

  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

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
        name: "Cities",
        item: `${SITE_URL}/cities`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.name,
        item: canonicalUrl,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name: city.title,

    description: city.description,

    url: canonicalUrl,

    inLanguage: "en-IN",

    isPartOf: {
      "@type": "WebSite",
      name: "UrbanHomey",
      url: `${SITE_URL}/`,
    },

    about: {
      "@type": "City",
      name: city.name,

      containedInPlace: {
        "@type": "State",
        name: city.state,

        containedInPlace: {
          "@type": "Country",
          name: "India",
        },
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: faqs.map((faq) => ({
      "@type": "Question",

      name: faq.question,

      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const schema = [
    breadcrumbSchema,
    webPageSchema,
    faqSchema,
  ];

  /* =======================================================
     OTHER CITIES
  ======================================================= */

  const otherCities = cityList
    .filter((item) => item.slug !== city.slug)
    .slice(0, 8);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <PageLayout>
      <SEO
        title={city.title}
        description={city.description}
        keywords={city.keywords}
        url={canonicalUrl}
        image="/og-image.jpg"
        type="website"
        schema={schema}
      />

      <main className="city-page">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav
          className="city-breadcrumb"
          aria-label="Breadcrumb"
        >
          <ol>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>

            <li aria-hidden="true">
              /
            </li>

            <li>
              <Link to="/cities">
                Cities
              </Link>
            </li>

            <li aria-hidden="true">
              /
            </li>

            <li aria-current="page">
              {city.name}
            </li>
          </ol>
        </nav>


        {/* =================================================
            HERO
        ================================================= */}

        <section className="city-hero">

          <div className="city-hero-content">

            <span className="city-eyebrow">
              Find compatible people and shared living
            </span>

            <h1>
              {city.heading}
            </h1>

            <p>
              {city.shortDescription}
            </p>

            <div className="city-hero-actions">

              <Link
                to={findRoomUrl}
                className="city-primary-btn"
              >
                Find Flatmates in {city.name}
              </Link>

              <Link
                to={listRoomUrl}
                className="city-secondary-btn"
              >
                List a Room in {city.name}
              </Link>

            </div>

          </div>


          <aside
            className="city-hero-card"
            aria-label={`Popular shared living areas in ${city.name}`}
          >

            <span className="city-card-label">
              Popular Areas
            </span>

            <h2>
              Explore {city.name}
            </h2>

            <p>
              Start your search around popular residential,
              education and employment hubs.
            </p>

            <div className="city-hero-area-list">

              {city.areas
                .slice(0, 6)
                .map((area) => (

                  <span key={area}>
                    {area}
                  </span>

                ))}

            </div>

          </aside>

        </section>


        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <section className="city-content-section">

          <div className="city-section-heading">

            <span>
              Shared Living in {city.name}
            </span>

            <h2>
              Find the Right Flatmate, Roommate or Room in{" "}
              {city.name}
            </h2>

          </div>


          <div className="city-text-grid">

            <article>

              <h3>
                Find Flatmates in {city.name}
              </h3>

              <p>
                Finding the right flatmate is about more than
                splitting monthly rent. Daily routines,
                cleanliness expectations, food preferences,
                work schedules, guests and social habits can
                influence whether people enjoy living together.
              </p>

              <p>
                UrbanHomey helps people looking for flatmates in{" "}
                {city.name} explore shared-living opportunities
                with greater attention to location, budget and
                lifestyle compatibility.
              </p>

            </article>


            <article>

              <h3>
                Find Rooms and Shared Accommodation
              </h3>

              <p>
                Whether you are relocating for work, beginning
                college, changing neighborhoods or looking for
                a different shared-living arrangement, you can
                explore room and flatmate opportunities around
                popular areas of {city.name}.
              </p>

              <p>
                Compare available options carefully, communicate
                with potential flatmates and discuss important
                living expectations before making a rental
                decision.
              </p>

            </article>

          </div>

        </section>


        {/* =================================================
            POPULAR AREAS
        ================================================= */}

        <section className="city-areas-section">

          <div className="city-section-heading">

            <span>
              Location Guide
            </span>

            <h2>
              Popular Areas to Find Flatmates and Rooms in{" "}
              {city.name}
            </h2>

            <p>
              Explore popular neighborhoods and shared-living
              locations across {city.name}.
            </p>

          </div>


          <div className="city-areas-grid">

            {city.areas.map((area, index) => (

              <article
                className="city-area-card"
                key={area}
              >

                <span className="city-area-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>
                  {area}
                </h3>

                <p>
                  Explore flatmates, roommates and shared
                  accommodation opportunities around {area},{" "}
                  {city.name}.
                </p>

                <Link
                  to={`${findRoomUrl}&area=${encodeURIComponent(area)}`}
                  aria-label={`Explore flatmates and rooms in ${area}, ${city.name}`}
                >
                  Explore {area}
                  <span aria-hidden="true">
                    →
                  </span>
                </Link>

              </article>

            ))}

          </div>

        </section>


        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <section className="city-how-section">

          <div className="city-section-heading">

            <span>
              How UrbanHomey Works
            </span>

            <h2>
              A Better Way to Search for Shared Living
            </h2>

          </div>


          <div className="city-how-grid">

            <article>

              <span>01</span>

              <h3>
                Create Your Profile
              </h3>

              <p>
                Add useful information about your location,
                budget, lifestyle and shared-living preferences.
              </p>

            </article>


            <article>

              <span>02</span>

              <h3>
                Explore Compatible People
              </h3>

              <p>
                Discover potential flatmates and roommates whose
                preferences may align with the way you want to
                live.
              </p>

            </article>


            <article>

              <span>03</span>

              <h3>
                Connect and Discuss
              </h3>

              <p>
                Talk about rent, location, daily routines and
                household expectations before making decisions.
              </p>

            </article>


            <article>

              <span>04</span>

              <h3>
                Choose Carefully
              </h3>

              <p>
                Verify important information, inspect the
                property where applicable and choose the shared
                living arrangement that works for you.
              </p>

            </article>

          </div>

        </section>


        {/* =================================================
            RELATED BLOGS
        ================================================= */}

        <section className="city-blogs-section">

          <div className="city-section-heading">

            <span>
              Guides & Resources
            </span>

            <h2>
              Shared-Living Guides for {city.name}
            </h2>

            <p>
              Read rental advice, flatmate guides and
              shared-living resources from UrbanHomey.
            </p>

          </div>


          {blogsLoading ? (

            <div className="city-empty-state">
              Loading guides...
            </div>

          ) : relatedBlogs.length > 0 ? (

            <div className="city-blogs-grid">

              {relatedBlogs.map((blog) => (

                <article
                  className="city-blog-card"
                  key={blog.id}
                >

                  {blog.image && (

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="city-blog-image-link"
                      aria-label={`Read ${blog.title}`}
                    >

                      <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        decoding="async"
                      />

                    </Link>

                  )}


                  <div className="city-blog-content">

                    {blog.category && (
                      <span>
                        {blog.category}
                      </span>
                    )}

                    <h3>

                      <Link
                        to={`/blog/${blog.slug}`}
                      >
                        {blog.title}
                      </Link>

                    </h3>

                    {blog.summary && (
                      <p>
                        {blog.summary}
                      </p>
                    )}

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="city-blog-read-link"
                    >
                      Read Guide
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="city-empty-state">

              <p>
                Explore UrbanHomey's latest flatmate, rental and
                shared-living guides.
              </p>

              <Link to="/blogs">
                View All Guides
              </Link>

            </div>

          )}

        </section>


        {/* =================================================
            FAQ
        ================================================= */}

        <section className="city-faq-section">

          <div className="city-section-heading">

            <span>
              Frequently Asked Questions
            </span>

            <h2>
              Finding Flatmates and Rooms in {city.name}
            </h2>

          </div>


          <div className="city-faq-list">

            {faqs.map((faq, index) => (

              <details
                className="city-faq-item"
                key={faq.question}
              >

                <summary>

                  <span>
                    {faq.question}
                  </span>

                  <span
                    className="city-faq-icon"
                    aria-hidden="true"
                  >
                    +
                  </span>

                </summary>

                <div className="city-faq-answer">

                  <p>
                    {faq.answer}
                  </p>

                </div>

              </details>

            ))}

          </div>

        </section>


        {/* =================================================
            OTHER CITIES
        ================================================= */}

        <nav
          className="city-other-cities"
          aria-label="Explore UrbanHomey in other cities"
        >

          <div className="city-section-heading">

            <span>
              Explore More Locations
            </span>

            <h2>
              Find Flatmates and Rooms in Other Cities
            </h2>

          </div>


          <div className="city-other-links">

            {otherCities.map((item) => (

              <Link
                key={item.slug}
                to={`/city/${item.slug}`}
                title={`Find flatmates, roommates and rooms in ${item.name}`}
              >
                {item.name}
              </Link>

            ))}


            <Link
              to="/cities"
              className="city-all-cities-link"
            >
              View All Cities
              <span aria-hidden="true">
                →
              </span>
            </Link>

          </div>

        </nav>


        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="city-final-cta">

          <span>
            Start Your Shared-Living Search
          </span>

          <h2>
            Find Flatmates, Roommates and Rooms in{" "}
            {city.name}
          </h2>

          <p>
            Explore people and shared-living opportunities based
            on your preferred location, budget and lifestyle.
          </p>

          <div className="city-final-actions">

            <Link
              to={findRoomUrl}
              className="city-primary-btn"
            >
              Start Finding Flatmates
            </Link>

            <Link
              to={listRoomUrl}
              className="city-secondary-btn"
            >
              List Your Room
            </Link>

          </div>

        </section>

      </main>
    </PageLayout>
  );
}

export default CityPage;