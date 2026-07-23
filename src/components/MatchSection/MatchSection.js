
import React from "react";
import { Link } from "react-router-dom";

import "./MatchSection.css";

import { ChevronRight } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";

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


import Person1 from "./person1.jpg";
import Person2 from "./person2.jpg";
import Person3 from "./person3.jpg";
import Person4 from "./person4.jpg";
import Person5 from "./person5.jpg";
import Person6 from "./person6.jpg";
import Person7 from "./person7.jpg";
import Person8 from "./person8.jpg";
import Person9 from "./person9.jpg";
import Person10 from "./person10.jpg";


/* =========================
   SAMPLE PROFILE DATA

   IMPORTANT:
   These profiles are currently
   homepage demonstration profiles.

   Replace with real public profile
   data later if you want indexable
   location/profile landing pages.
========================= */

const profiles = [
  {
    id: 1,
    name: "Aarohi",
    age: 26,
    location: "Wakad, Pune",
    match: "92%",
    tags: ["Designer", "Early Bird"],
    image: Person1,
  },

  {
    id: 2,
    name: "Arjun",
    age: 28,
    location: "Koramangala, Bengaluru",
    match: "88%",
    tags: ["Remote Worker", "Foodie"],
    image: Person2,
  },

  {
    id: 3,
    name: "Priya",
    age: 24,
    location: "Salt Lake, Kolkata",
    match: "95%",
    tags: ["Student", "Quiet"],
    image: Person3,
  },

  {
    id: 4,
    name: "Riya",
    age: 27,
    location: "Gachibowli, Hyderabad",
    match: "91%",
    tags: ["Traveler", "Friendly"],
    image: Person4,
  },

  {
    id: 5,
    name: "Ananya",
    age: 25,
    location: "Anna Nagar, Chennai",
    match: "96%",
    tags: ["Artist", "Creative"],
    image: Person5,
  },

  {
    id: 6,
    name: "Kabir",
    age: 23,
    location: "Satellite, Ahmedabad",
    match: "89%",
    tags: ["Fitness", "Music"],
    image: Person6,
  },

  {
    id: 7,
    name: "Ishita",
    age: 29,
    location: "Connaught Place, Delhi",
    match: "97%",
    tags: ["Tech", "Coffee"],
    image: Person7,
  },

  {
    id: 8,
    name: "Rahul",
    age: 27,
    location: "Civil Lines, Jaipur",
    match: "94%",
    tags: ["Software Engineer", "Gym"],
    image: Person8,
  },

  {
    id: 9,
    name: "Sneha",
    age: 25,
    location: "Hazratganj, Lucknow",
    match: "93%",
    tags: ["Marketing", "Reader"],
    image: Person9,
  },

  {
    id: 10,
    name: "Aditya",
    age: 26,
    location: "MG Road, Kochi",
    match: "98%",
    tags: ["Startup", "Traveler"],
    image: Person10,
  },
];


function MatchSection() {
  return (
    <section
      className="match-section"
      id="matches"
      aria-labelledby="potential-flatmate-matches-heading"
    >

      {/* =========================
          SECTION HEADER
      ========================= */}

      <div className="match-header-section">

        <div className="match-text">

          <h2 id="potential-flatmate-matches-heading">
            Discover Compatible Flatmates and Roommates Across India
          </h2>


          <p>
            Explore how UrbanHomey helps students and working
            professionals discover potential flatmates and roommates
            based on location, lifestyle, habits, budget, and
            shared-living preferences.
          </p>

        </div>



        {/* =========================
            VIEW MATCHES LINK
        ========================= */}

        <Link
          to="/matches"
          className="matches-btn"
          aria-label="Explore compatible flatmate and roommate matches on UrbanHomey"
        >

          Explore Matches

          <ChevronRight
            size={22}
            aria-hidden="true"
          />

        </Link>

      </div>



      {/* =========================
          PROFILE CAROUSEL
      ========================= */}

      <div className="match-wrapper">

        <Swiper
          modules={[
            Autoplay,
            Pagination,
            A11y,
          ]}

          spaceBetween={25}

          loop={true}

          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}

          pagination={{
            clickable: true,
          }}

          a11y={{
            enabled: true,

            prevSlideMessage:
              "Previous flatmate profile",

            nextSlideMessage:
              "Next flatmate profile",

            firstSlideMessage:
              "This is the first flatmate profile",

            lastSlideMessage:
              "This is the last flatmate profile",

            paginationBulletMessage:
              "Go to flatmate profile {{index}}",
          }}

          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },

            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            1200: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
          }}
        >

          {profiles.map((person) => (

            <SwiperSlide key={person.id}>

              <article
                className="main-card"
                aria-label={`Sample flatmate profile in ${person.location}`}
              >

                <div className="profile-image-section">


                  {/* =========================
                      PROFILE IMAGE
                  ========================= */}

                  <img
                    src={person.image}

                    alt={`Sample flatmate profile from ${person.location} interested in ${person.tags.join(
                      " and "
                    )}`}

                    width="500"
                    height="650"

                    loading="lazy"
                  />



                  {/* =========================
                      MATCH PERCENTAGE
                  ========================= */}

                  <div className="top-badges">

                    <span
                      className="match-badge"
                      aria-label={`${person.match} compatibility match example`}
                    >
                      {person.match} Match
                    </span>

                  </div>



                  {/* =========================
                      PROFILE CONTENT
                  ========================= */}

                  <div className="card-content">

                    <h3>
                      {person.name}, {person.age}
                    </h3>



                    {/* LOCATION */}

                    <p className="location">

                      <FaMapMarkerAlt
                        className="location-icon"
                        aria-hidden="true"
                      />


                      <span className="location-text">
                        {person.location}
                      </span>

                    </p>



                    {/* INTEREST TAGS */}

                    <div
                      className="interest-tags"
                      aria-label={`Interests and lifestyle preferences: ${person.tags.join(
                        ", "
                      )}`}
                    >

                      {person.tags.map((tag) => (

                        <span key={tag}>
                          {tag}
                        </span>

                      ))}

                    </div>



                    {/* =========================
                        EXPLORE MATCHES
                    ========================= */}

                    <Link
                      to="/matches"
                      className="view-btn"
                      aria-label={`Explore flatmate and roommate matches similar to the sample profile in ${person.location}`}
                    >
                      Explore Matches
                    </Link>



                    {/* =========================
                        SAMPLE PROFILE LABEL
                    ========================= */}

                    <span className="verified-badge">
                      SAMPLE PROFILE
                    </span>

                  </div>

                </div>

              </article>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
}


export default MatchSection;

