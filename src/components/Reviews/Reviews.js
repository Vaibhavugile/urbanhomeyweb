
import React, { useMemo, useState } from "react";

import "./Reviews.css";

import {
  FaStar,
  FaRegStar,
} from "react-icons/fa";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Autoplay,
  Pagination,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";


/* =========================
   SAMPLE REVIEW DATA

   IMPORTANT:
   These are homepage demonstration
   reviews.

   Replace them later with real
   approved reviews from Firestore
   or your backend.
========================= */

const initialReviews = [
  {
    id: 1,

    name: "Sneha Kulkarni",

    location: "Kothrud, Pune",

    rating: 5,

    review:
      "Found my perfect flatmate within a week! UrbanHomey made the whole process easy to understand and use.",

    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",

    isSample: true,
  },

  {
    id: 2,

    name: "Rahul Deshmukh",

    location: "Hinjawadi, Pune",

    rating: 5,

    review:
      "I liked being able to compare lifestyle preferences and living habits while exploring potential flatmates.",

    avatar:
      "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=80&h=80&fit=crop&crop=face",

    isSample: true,
  },

  {
    id: 3,

    name: "Ananya Joshi",

    location: "Viman Nagar, Pune",

    rating: 4,

    review:
      "The profile details make it easier to understand what someone is looking for before exploring a potential match.",

    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face",

    isSample: true,
  },

  {
    id: 4,

    name: "Kabir Shaikh",

    location: "Baner, Pune",

    rating: 5,

    review:
      "The lifestyle preferences and interest tags make browsing potential flatmates simple and convenient.",

    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",

    isSample: true,
  },

  {
    id: 5,

    name: "Priya Mehta",

    location: "Wakad, Pune",

    rating: 5,

    review:
      "Compatibility and shared-living preferences are useful factors when searching for a potential flatmate.",

    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face",

    isSample: true,
  },
];


function Reviews() {
  const [reviews, setReviews] =
    useState(initialReviews);

  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      location: "",
      rating: 0,
      review: "",
    });

  const [hovered, setHovered] =
    useState(0);

  const [formError, setFormError] =
    useState("");


  /* =========================
     CALCULATE REVIEW SUMMARY
  ========================= */

  const reviewSummary = useMemo(() => {
    if (reviews.length === 0) {
      return {
        average: 0,
        total: 0,
        percentages: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      };
    }


    const totalRating = reviews.reduce(
      (sum, review) =>
        sum + review.rating,
      0
    );


    const average =
      totalRating / reviews.length;


    const percentages = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };


    reviews.forEach((review) => {
      percentages[review.rating] += 1;
    });


    Object.keys(percentages).forEach(
      (rating) => {
        percentages[rating] = Math.round(
          (
            percentages[rating] /
            reviews.length
          ) * 100
        );
      }
    );


    return {
      average,
      total: reviews.length,
      percentages,
    };
  }, [reviews]);


  /* =========================
     FORM INPUT HANDLER
  ========================= */

  const handleInputChange = (event) => {
    const {
      name,
      value,
    } = event.target;


    setForm((currentForm) => ({
      ...currentForm,

      [name]: value,
    }));


    if (formError) {
      setFormError("");
    }
  };


  /* =========================
     SELECT RATING
  ========================= */

  const selectRating = (rating) => {
    setForm((currentForm) => ({
      ...currentForm,

      rating,
    }));


    setFormError("");
  };


  /* =========================
     SUBMIT REVIEW
  ========================= */

  const handleSubmit = (event) => {
    event.preventDefault();


    const cleanName =
      form.name.trim();

    const cleanLocation =
      form.location.trim();

    const cleanReview =
      form.review.trim();


    if (
      !cleanName ||
      !cleanReview ||
      form.rating === 0
    ) {
      setFormError(
        "Please enter your name, select a rating, and write your review."
      );

      return;
    }


    const newReview = {
      id:
        Date.now(),

      name:
        cleanName,

      location:
        cleanLocation ||
        "India",

      rating:
        form.rating,

      review:
        cleanReview,

      avatar:
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          cleanName
        )}&background=6366f1&color=fff&size=80`,

      isSample:
        false,
    };


    setReviews((currentReviews) => [
      newReview,
      ...currentReviews,
    ]);


    setForm({
      name: "",
      location: "",
      rating: 0,
      review: "",
    });


    setHovered(0);

    setFormError("");

    setShowForm(false);
  };


  /* =========================
     CLOSE REVIEW FORM
  ========================= */

  const closeReviewForm = () => {
    setShowForm(false);

    setHovered(0);

    setFormError("");
  };


  return (
    <section
      className="reviews-section"
      id="reviews"
      aria-labelledby="urbanhomey-reviews-heading"
    >

      {/* =========================
          SECTION HEADER
      ========================= */}

      <div className="reviews-header">

        <h2 id="urbanhomey-reviews-heading">
          Flatmate Finding Experiences on UrbanHomey
        </h2>


        <p>
          Explore example experiences that demonstrate how
          students and working professionals can use UrbanHomey
          to discover potential flatmates, roommates, and
          compatible shared-living options.
        </p>

      </div>



      {/* =========================
          INFORMATION MESSAGE
      ========================= */}

      <div
        className="reviews-top-msg"
        role="note"
      >

        <span aria-hidden="true">
          ⭐
        </span>


        <p>
          Explore sample experiences and see how lifestyle,
          location, budget, habits, and living preferences can
          help people evaluate potential flatmate matches.
        </p>

      </div>



      {/* =========================
          REVIEW SUMMARY
      ========================= */}

      <div className="reviews-summary-card">

        <div className="summary-left">

          <div
            className="summary-score"
            aria-label={`Average displayed rating ${reviewSummary.average.toFixed(
              1
            )} out of 5`}
          >
            {reviewSummary.average.toFixed(1)}
          </div>


          <div
            className="summary-stars"
            aria-hidden="true"
          >

            {[1, 2, 3, 4, 5].map(
              (star) => (

                <FaStar
                  key={star}

                  className={
                    star <=
                    Math.round(
                      reviewSummary.average
                    )
                      ? "star-filled"
                      : "star-empty"
                  }
                />

              )
            )}

          </div>


          <div className="summary-count">
            Based on {reviewSummary.total} displayed experiences
          </div>

        </div>



        {/* =========================
            RATING DISTRIBUTION
        ========================= */}

        <div
          className="summary-right"
          aria-label="Displayed rating distribution"
        >

          {[5, 4, 3, 2, 1].map(
            (star) => {

              const percentage =
                reviewSummary.percentages[star];


              return (

                <div
                  className="rating-bar-row"
                  key={star}
                >

                  <span>
                    {star}
                  </span>


                  <FaStar
                    className="bar-star"
                    aria-hidden="true"
                  />


                  <div
                    className="rating-bar-track"
                    aria-hidden="true"
                  >

                    <div
                      className="rating-bar-fill"

                      style={{
                        width:
                          `${percentage}%`,
                      }}
                    />

                  </div>


                  <span className="bar-pct">
                    {percentage}%
                  </span>

                </div>

              );

            }
          )}

        </div>



        {/* =========================
            WRITE REVIEW BUTTON
        ========================= */}

        <div className="summary-add-review">

          <p className="summary-add-label">
            Want to share your experience?
          </p>


          <button
            type="button"

            className="btn-write"

            aria-expanded={showForm}

            aria-controls="urbanhomey-review-form"

            onClick={() =>
              setShowForm(
                (currentValue) =>
                  !currentValue
              )
            }
          >
            ✏️ Write a Review
          </button>

        </div>

      </div>



      {/* =========================
          REVIEW FORM
      ========================= */}

      {showForm && (

        <form
          id="urbanhomey-review-form"

          className="review-form"

          onSubmit={handleSubmit}

          noValidate
        >

          <h3>
            Share Your UrbanHomey Experience
          </h3>


          <p className="review-form-description">
            Tell us about your experience using UrbanHomey
            to explore flatmates, roommates, rooms, or
            shared-living options.
          </p>



          {/* NAME + LOCATION */}

          <div className="form-row">

            <div className="review-field">

              <label htmlFor="review-name">
                Your name
              </label>


              <input
                id="review-name"

                name="name"

                type="text"

                placeholder="Enter your name"

                value={form.name}

                onChange={handleInputChange}

                maxLength={80}

                autoComplete="name"

                required
              />

            </div>


            <div className="review-field">

              <label htmlFor="review-location">
                Your location
              </label>


              <input
                id="review-location"

                name="location"

                type="text"

                placeholder="For example: Baner, Pune"

                value={form.location}

                onChange={handleInputChange}

                maxLength={100}

                autoComplete="address-level2"
              />

            </div>

          </div>



          {/* =========================
              STAR RATING
          ========================= */}

          <fieldset className="form-stars">

            <legend>
              Your Rating
            </legend>


            <div
              className="star-rating-buttons"

              onMouseLeave={() =>
                setHovered(0)
              }
            >

              {[1, 2, 3, 4, 5].map(
                (star) => {

                  const activeRating =
                    hovered ||
                    form.rating;


                  const StarIcon =
                    star <= activeRating
                      ? FaStar
                      : FaRegStar;


                  return (

                    <button
                      key={star}

                      type="button"

                      className="star-button"

                      aria-label={`Rate UrbanHomey ${star} out of 5 stars`}

                      aria-pressed={
                        form.rating === star
                      }

                      onMouseEnter={() =>
                        setHovered(star)
                      }

                      onFocus={() =>
                        setHovered(star)
                      }

                      onBlur={() =>
                        setHovered(0)
                      }

                      onClick={() =>
                        selectRating(star)
                      }
                    >

                      <StarIcon
                        className={
                          star <= activeRating
                            ? "star-pick filled"
                            : "star-pick"
                        }

                        aria-hidden="true"
                      />

                    </button>

                  );

                }
              )}

            </div>

          </fieldset>



          {/* =========================
              REVIEW TEXT
          ========================= */}

          <div className="review-field">

            <label htmlFor="review-message">
              Your review
            </label>


            <textarea
              id="review-message"

              name="review"

              placeholder="Tell us about your experience..."

              value={form.review}

              onChange={handleInputChange}

              rows={5}

              minLength={10}

              maxLength={1000}

              required
            />


            <span className="review-character-count">
              {form.review.length}/1000
            </span>

          </div>



          {/* =========================
              VALIDATION MESSAGE
          ========================= */}

          {formError && (

            <p
              className="review-form-error"

              role="alert"
            >
              {formError}
            </p>

          )}



          {/* =========================
              FORM BUTTONS
          ========================= */}

          <div className="form-btns">

            <button
              type="button"

              className="btn-cancel"

              onClick={closeReviewForm}
            >
              Cancel
            </button>


            <button
              type="submit"

              className="btn-submit"
            >
              Submit Review
            </button>

          </div>

        </form>

      )}



      {/* =========================
          REVIEW CAROUSEL
      ========================= */}

      <div className="reviews-swiper-wrapper">

        <Swiper
          modules={[
            Autoplay,
            Pagination,
            A11y,
          ]}

          spaceBetween={20}

          loop={
            reviews.length > 3
          }

          autoplay={{
            delay: 4000,

            disableOnInteraction:
              false,

            pauseOnMouseEnter:
              true,
          }}

          pagination={{
            clickable: true,
          }}

          a11y={{
            enabled: true,

            prevSlideMessage:
              "Previous UrbanHomey experience",

            nextSlideMessage:
              "Next UrbanHomey experience",

            paginationBulletMessage:
              "Go to experience {{index}}",
          }}

          breakpoints={{
            320: {
              slidesPerView: 1,
            },

            768: {
              slidesPerView: 2,
            },

            1200: {
              slidesPerView: 3,
            },
          }}
        >

          {reviews.map((review) => (

            <SwiperSlide key={review.id}>

              <ReviewCard
                review={review}
              />

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
}


/* =========================
   REVIEW CARD
========================= */

function ReviewCard({
  review,
}) {
  return (
    <article
      className="review-card"

      aria-label={`${review.rating} out of 5 star displayed experience from ${review.location}`}
    >

      <div className="review-top">

        <img
          src={review.avatar}

          alt=""

          width="80"

          height="80"

          loading="lazy"

          decoding="async"
        />


        <div className="review-info">

          <h3>
            {review.name}
          </h3>


          <span>
            {review.location}
          </span>

        </div>


        <span className="verified-tag">

          {review.isSample
            ? "Sample Experience"
            : "Submitted Experience"}

        </span>

      </div>



      <div
        className="stars"

        aria-label={`${review.rating} out of 5 stars`}
      >

        {[1, 2, 3, 4, 5].map(
          (star) => (

            star <= review.rating
              ? (

                <FaStar
                  key={star}

                  aria-hidden="true"
                />

              )
              : (

                <FaRegStar
                  key={star}

                  aria-hidden="true"
                />

              )

          )
        )}

      </div>


      <p className="review-text">
        “{review.review}”
      </p>

    </article>
  );
}


export default Reviews;

