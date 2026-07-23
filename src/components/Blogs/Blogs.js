import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

import { db } from "../../firebase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Blogs.css";

/* =========================
   CONSTANTS
========================= */

const FEATURED_BLOG_LIMIT = 6;

const DEFAULT_BLOG_IMAGE = "/og-image.jpg";

/* =========================
   HELPERS
========================= */

const getBlogUrl = (blog) => {
  if (!blog?.slug) {
    return "/blogs";
  }

  return `/blog/${encodeURIComponent(blog.slug)}`;
};

const getImageAlt = (blog) => {
  if (blog?.imageAlt) {
    return blog.imageAlt;
  }

  if (blog?.title) {
    return `${blog.title} - UrbanHomey flatmate and rental guide`;
  }

  return "UrbanHomey flatmate, roommate and room rental guide";
};

const getBlogDateTime = (blog) => {
  if (blog?.createdAt?.toDate) {
    return blog.createdAt.toDate().toISOString();
  }

  return undefined;
};

/* =========================
   BLOGS COMPONENT
========================= */

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      try {
        setLoading(true);

        setError("");

        /*
         * Fetch only the latest blogs needed
         * for the homepage instead of downloading
         * the complete blogs collection.
         */

        const blogsQuery = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc"),
          limit(FEATURED_BLOG_LIMIT)
        );

        const snapshot = await getDocs(blogsQuery);

        const blogsData = snapshot.docs
          .map((blogDocument) => ({
            id: blogDocument.id,
            ...blogDocument.data(),
          }))
          .filter((blog) => blog.slug && blog.title);

        if (isMounted) {
          setBlogs(blogsData);
        }
      } catch (fetchError) {
        console.error(
          "Error fetching UrbanHomey blogs:",
          fetchError
        );

        if (isMounted) {
          setError(
            "We could not load the latest flatmate guides right now."
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

  return (
    <section
      className="blogs-section"
      id="blogs"
      aria-labelledby="blogs-heading"
    >
      {/* =========================
          SEO HEADER
      ========================= */}

      <header className="blogs-header">

        <span className="blogs-eyebrow">
          FLATMATE & RENTAL RESOURCES
        </span>

        <h2 id="blogs-heading">
          Flatmate, Roommate & Room Rental Guides in India
        </h2>

        <p>
          Explore practical flatmate tips, roommate safety advice,
          rental guides and shared-living resources for students and
          working professionals searching for compatible flatmates
          and rooms for rent across India.
        </p>

      </header>


      {/* =========================
          LOADING STATE
      ========================= */}

      {loading && (
        <div
          className="blogs-loading"
          role="status"
          aria-live="polite"
        >
          Loading the latest UrbanHomey guides...
        </div>
      )}


      {/* =========================
          ERROR STATE
      ========================= */}

      {!loading && error && (
        <div
          className="blogs-loading"
          role="alert"
        >
          {error}
        </div>
      )}


      {/* =========================
          EMPTY STATE
      ========================= */}

      {!loading &&
        !error &&
        blogs.length === 0 && (

          <div className="blogs-loading">

            New flatmate, roommate and rental guides
            are coming soon.

          </div>

        )}


      {/* =========================
          BLOG SWIPER
      ========================= */}

      {!loading &&
        !error &&
        blogs.length > 0 && (

          <div className="blogs-swiper-wrapper">

            <Swiper
              modules={[
                Pagination,
                Autoplay,
                A11y,
              ]}

              spaceBetween={24}

              watchOverflow={true}

              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}

              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}

              a11y={{
                enabled: true,
                prevSlideMessage:
                  "Previous UrbanHomey article",

                nextSlideMessage:
                  "Next UrbanHomey article",

                firstSlideMessage:
                  "This is the first article",

                lastSlideMessage:
                  "This is the last article",
              }}

              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },

                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 18,
                },

                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },

                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}

              className="blogs-swiper"
            >

              {blogs.map((blog) => {

                const blogUrl =
                  getBlogUrl(blog);

                const dateTime =
                  getBlogDateTime(blog);

                return (

                  <SwiperSlide
                    key={blog.id}
                  >

                    <article className="blog-card">

                      {/* =========================
                          BLOG IMAGE
                      ========================= */}

                      <Link
                        to={blogUrl}
                        className="blog-image-link"
                        aria-label={`Read ${blog.title}`}
                      >

                        <div className="blog-image">

                          <img
                            src={
                              blog.image ||
                              DEFAULT_BLOG_IMAGE
                            }

                            alt={getImageAlt(blog)}

                            loading="lazy"

                            decoding="async"

                            width="640"

                            height="400"

                            onError={(event) => {
                              event.currentTarget.onerror =
                                null;

                              event.currentTarget.src =
                                DEFAULT_BLOG_IMAGE;
                            }}
                          />


                          {blog.category && (

                            <span className="blog-category">

                              {blog.category}

                            </span>

                          )}

                        </div>

                      </Link>


                      {/* =========================
                          BLOG CONTENT
                      ========================= */}

                      <div className="blog-content">


                        {/* BLOG TITLE */}

                        <h3>

                          <Link
                            to={blogUrl}
                            className="blog-title-link"
                          >

                            {blog.title}

                          </Link>

                        </h3>


                        {/* BLOG SUMMARY */}

                        {blog.summary && (

                          <p className="blog-summary">

                            {blog.summary}

                          </p>

                        )}


                        {/* BLOG AUTHOR */}

                        {(blog.author ||
                          blog.authorLocation) && (

                          <div className="blog-author">

                            {blog.author && (

                              <span className="author-name">

                                By {blog.author}

                              </span>

                            )}


                            {blog.authorLocation && (

                              <span className="author-location">

                                {blog.authorLocation}

                              </span>

                            )}

                          </div>

                        )}


                        {/* BLOG METADATA */}

                        {(blog.date ||
                          blog.readTime) && (

                          <div className="blog-meta">

                            {blog.date && (

                              <time
                                dateTime={dateTime}
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


                        {/* READ MORE LINK */}

                        <Link
                          to={blogUrl}
                          className="read-btn"
                          aria-label={`Read full article: ${blog.title}`}
                        >

                          Read Full Guide

                          <span
                            aria-hidden="true"
                          >
                            →
                          </span>

                        </Link>

                      </div>

                    </article>

                  </SwiperSlide>

                );

              })}

            </Swiper>

          </div>

        )}


      {/* =========================
          INTERNAL LINK TO BLOGS PAGE
      ========================= */}

      <div className="view-all-wrapper">

        <Link
          to="/blogs"
          className="view-all-btn"
        >

          Explore All Flatmate & Rental Guides

          <span aria-hidden="true">
            →
          </span>

        </Link>

      </div>

    </section>
  );
}

export default Blogs;