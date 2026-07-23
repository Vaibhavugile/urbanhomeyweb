import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Downloadpage.css";

import SEO from "../SEO/SEO";

import urbanHomeyHomeScreen from "../../assets/urbanhomey-home-screen.png";
import urbanHomeyExploreScreen from "../../assets/urbanhomey-explore-screen.png";

import {
  cityList,
  topCities,
} from "../../data/cities";

/* =========================
   STORE LINKS

   ADD REAL STORE LINKS
   WHEN YOUR APPS ARE LIVE.
========================= */

const GOOGLE_PLAY_URL = "";
const APP_STORE_URL = "";

/* =========================
   DOWNLOAD PAGE
========================= */

const Downloadpage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");

  /* =========================
     NORMALIZE CITY SEARCH
  ========================= */

  const normalizeCitySlug = (value = "") => {
    return value
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  /* =========================
     SEARCH INPUT CHANGE
  ========================= */

  const handleSearchChange = (event) => {
    setSearch(event.target.value);

    if (searchError) {
      setSearchError("");
    }
  };

  /* =========================
     FIND CITY
  ========================= */

  const findMatchingCity = (searchValue) => {
    const normalizedSearch = normalizeCitySlug(searchValue);

    if (!normalizedSearch) {
      return null;
    }

    return (
      cityList.find((city) => {
        const normalizedName = normalizeCitySlug(city.name);
        const normalizedSlug = normalizeCitySlug(city.slug);

        return (
          normalizedName === normalizedSearch ||
          normalizedSlug === normalizedSearch
        );
      }) || null
    );
  };

  /* =========================
     SEARCH SUBMIT
  ========================= */

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      setSearchError("Please enter a city name.");
      return;
    }

    const matchedCity = findMatchingCity(trimmedSearch);

    if (matchedCity) {
      setSearchError("");

      navigate(`/city/${matchedCity.slug}`);

      return;
    }

    setSearchError(
      `UrbanHomey does not currently have a city page for "${trimmedSearch}". Explore all available cities below.`
    );
  };

  /* =========================
     STORE BUTTON CLICK
  ========================= */

  const handleStoreClick = (event, storeUrl) => {
    if (!storeUrl) {
      event.preventDefault();

      navigate("/support");
    }
  };

  /* =========================
     STRUCTURED DATA
  ========================= */

  const structuredData = [
    {
      "@context": "https://schema.org",

      "@type": "WebPage",

      name:
        "Download UrbanHomey App - Find Flatmates, Roommates and Rooms in India",

      description:
        "Download UrbanHomey to discover compatible flatmates, roommates, shared accommodation and rooms across supported Indian cities based on location, budget, lifestyle and living preferences.",

      url:
        "https://www.urbanhomey.com/download-app",

      isPartOf: {
        "@type": "WebSite",

        name: "UrbanHomey",

        url:
          "https://www.urbanhomey.com/",
      },

      about: {
        "@type": "Thing",

        name:
          "Flatmate, roommate and room discovery in India",
      },
    },

    {
      "@context": "https://schema.org",

      "@type": "MobileApplication",

      name: "UrbanHomey",

      applicationCategory:
        "LifestyleApplication",

      operatingSystem:
        "Android, iOS",

      description:
        "UrbanHomey helps people discover compatible flatmates, roommates, shared accommodation and rooms based on location, budget, lifestyle and daily living preferences.",

      url:
        "https://www.urbanhomey.com/download-app",
    },
  ];

  return (
    <main className="downloadpage-page">

      {/* =====================================================
          PAGE SEO
      ===================================================== */}

      <SEO
        title="Download UrbanHomey App | Find Flatmates, Roommates & Rooms in India"
        description="Download UrbanHomey to find compatible flatmates, roommates, shared accommodation and rooms across India. Explore supported cities and search based on location, budget, lifestyle and living preferences."
        keywords="download UrbanHomey app, UrbanHomey mobile app, flatmate finder app India, roommate finder app India, room finder app India, find flatmates India, find roommates India, rooms for rent India, shared rooms India, shared accommodation India, compatible flatmates, verified flatmates, find flatmates Pune, find roommates Bengaluru, find flatmates Hyderabad, find flatmates Mumbai, find flatmates Delhi, find rooms Chennai"
        url="https://www.urbanhomey.com/download-app"
        image="https://www.urbanhomey.com/og-image.jpg"
        structuredData={structuredData}
      />

      {/* =====================================================
          MAIN HERO
      ===================================================== */}

      <section
        className="downloadpage-hero"
        aria-labelledby="downloadpage-main-heading"
      >

        <span className="hero-badge">
          Find compatible flatmates and rooms across India
        </span>

        <h1
          className="hero-heading"
          id="downloadpage-main-heading"
        >
          Find Flatmates, Roommates
          <br />

          <span>
            and Rooms in India
          </span>
        </h1>

        <p className="hero-subtext">
          Discover compatible flatmates, roommates and shared rooms
          based on your city, preferred location, budget, lifestyle
          and daily living habits with UrbanHomey.
        </p>

        {/* =========================
            CITY SEARCH
        ========================= */}

        <form
          className="search-bar"
          role="search"
          onSubmit={handleSearchSubmit}
        >

          <span
            className="search-icon"
            aria-hidden="true"
          >
            📍
          </span>

          <label
            htmlFor="flatmate-city-search"
            className="sr-only"
          >
            Search for flatmates and rooms by city
          </label>

          <input
            id="flatmate-city-search"
            type="search"
            name="city"
            placeholder="Search city, for example Pune"
            value={search}
            onChange={handleSearchChange}
            autoComplete="address-level2"
            aria-label="Search flatmates and rooms by city"
            aria-describedby={
              searchError
                ? "city-search-error"
                : undefined
            }
          />

          <button
            type="submit"
            className="hero-search-button"
            aria-label="Search flatmates and rooms"
          >
            Search
          </button>

        </form>

        {/* =========================
            SEARCH ERROR
        ========================= */}

        {searchError && (
          <div
            id="city-search-error"
            className="city-search-error"
            role="alert"
          >
            <span>{searchError}</span>

            <Link to="/cities">
              Explore All Cities
            </Link>
          </div>
        )}

        {/* =========================
            TOP CITY LINKS
        ========================= */}

        <nav
          className="top-cities"
          aria-label="Popular cities for finding flatmates, roommates and rooms for rent"
        >

          <span className="top-cities-label">
            Popular Cities:
          </span>

          <div className="top-cities-links">

            {topCities.map((city, index) => (
              <React.Fragment key={city.slug}>

                <Link
                  to={`/city/${city.slug}`}
                  className="top-city-link"
                  title={`Find flatmates, roommates and rooms for rent in ${city.name}`}
                  aria-label={`Find flatmates, roommates and rooms for rent in ${city.name}`}
                >
                  {city.name}
                </Link>

                {index < topCities.length - 1 && (
                  <span
                    className="city-separator"
                    aria-hidden="true"
                  >
                    ,
                  </span>
                )}

              </React.Fragment>
            ))}

            <Link
              to="/cities"
              className="cities-arrow"
              aria-label="View all cities where UrbanHomey helps users find flatmates, roommates and rooms"
              title="Explore all UrbanHomey cities"
            >
              <span aria-hidden="true">
                &rsaquo;
              </span>
            </Link>

          </div>

        </nav>

        {/* =========================
            HERO ILLUSTRATION
        ========================= */}

        <div
          className="hero-illustration"
          aria-hidden="true"
        >

          <svg
            viewBox="0 0 640 150"
            xmlns="http://www.w3.org/2000/svg"
          >

            {/* HOUSE */}

            <g transform="translate(20,30)">

              <path
                d="M0 55 L55 10 L110 55 V100 H0 Z"
                fill="#FDE68A"
              />

              <rect
                x="40"
                y="65"
                width="30"
                height="35"
                fill="#1B2A41"
                opacity="0.85"
              />

              <circle
                cx="55"
                cy="82"
                r="3"
                fill="#FDE68A"
              />

              <rect
                x="0"
                y="100"
                width="110"
                height="6"
                fill="#1B2A41"
                opacity="0.15"
              />

            </g>

            {/* FLATMATE MATCH */}

            <g transform="translate(180,50)">

              <circle
                cx="25"
                cy="20"
                r="20"
                fill="#8B6FE8"
              />

              <circle
                cx="95"
                cy="20"
                r="20"
                fill="#F472B6"
              />

              <rect
                x="40"
                y="35"
                width="40"
                height="14"
                rx="7"
                fill="#FBBF24"
              />

            </g>

            {/* SOFA */}

            <g transform="translate(330,55)">

              <rect
                x="0"
                y="20"
                width="100"
                height="35"
                rx="10"
                fill="#43B981"
              />

              <rect
                x="0"
                y="0"
                width="100"
                height="22"
                rx="10"
                fill="#34A06B"
              />

              <rect
                x="-8"
                y="35"
                width="14"
                height="25"
                rx="6"
                fill="#2F8F5E"
              />

              <rect
                x="94"
                y="35"
                width="14"
                height="25"
                rx="6"
                fill="#2F8F5E"
              />

            </g>

            {/* MOVING BOX */}

            <g transform="translate(470,55)">

              <rect
                x="0"
                y="0"
                width="60"
                height="50"
                rx="4"
                fill="#FB923C"
              />

              <line
                x1="0"
                y1="25"
                x2="60"
                y2="25"
                stroke="#C2570F"
                strokeWidth="4"
              />

              <line
                x1="30"
                y1="0"
                x2="30"
                y2="50"
                stroke="#C2570F"
                strokeWidth="4"
              />

            </g>

            {/* PLANT */}

            <g transform="translate(560,40)">

              <ellipse
                cx="25"
                cy="35"
                rx="24"
                ry="22"
                fill="#22C55E"
              />

              <path
                d="M10 70 L18 45 H32 L40 70 Z"
                fill="#D97706"
              />

            </g>

          </svg>

        </div>

      </section>

      {/* =====================================================
          APP DOWNLOAD SECTION
      ===================================================== */}

      <section
        className="app-download-section"
        aria-labelledby="app-download-heading"
      >

        <div className="app-download-copy">

          <span className="app-download-eyebrow">
            UrbanHomey Mobile App
          </span>

          <h2
            className="app-download-heading"
            id="app-download-heading"
          >
            Search for Flatmates and Rooms Wherever You Are
          </h2>

          <p className="app-download-subtext">
            Use UrbanHomey on mobile to discover flatmates,
            roommates and rooms, compare living preferences and
            explore compatible matches across supported Indian cities.
          </p>

          {/* =========================
              STORE LINKS
          ========================= */}

          <div className="store-badges">

            <a
              href={GOOGLE_PLAY_URL || "/support"}
              target={
                GOOGLE_PLAY_URL
                  ? "_blank"
                  : undefined
              }
              rel={
                GOOGLE_PLAY_URL
                  ? "noopener noreferrer"
                  : undefined
              }
              className="store-badge"
              aria-label="Get UrbanHomey on Google Play"
              onClick={(event) =>
                handleStoreClick(
                  event,
                  GOOGLE_PLAY_URL
                )
              }
            >

              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                aria-hidden="true"
              >
                <path
                  d="M3 2.5 L17 12 L3 21.5 Z"
                  fill="#fff"
                />
              </svg>

              <span className="store-badge-text">

                <small>
                  Get it on
                </small>

                Google Play

              </span>

            </a>

            <a
              href={APP_STORE_URL || "/support"}
              target={
                APP_STORE_URL
                  ? "_blank"
                  : undefined
              }
              rel={
                APP_STORE_URL
                  ? "noopener noreferrer"
                  : undefined
              }
              className="store-badge"
              aria-label="Download UrbanHomey on the App Store"
              onClick={(event) =>
                handleStoreClick(
                  event,
                  APP_STORE_URL
                )
              }
            >

              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                aria-hidden="true"
              >

                <path
                  d="M16.2 1.7c.1 1-.3 2-.9 2.7-.6.7-1.6 1.3-2.5 1.2-.1-1 .4-2 1-2.7.6-.7 1.6-1.2 2.4-1.2zM19.6 17c-.5 1.1-.8 1.6-1.4 2.6-.9 1.3-2.2 3-3.8 3-1.4 0-1.8-.9-3.4-.9-1.6 0-2 .9-3.4.9-1.6 0-2.8-1.6-3.7-2.9C1.5 16.8.8 12.6 2.6 9.8c.9-1.4 2.5-2.3 4-2.3 1.4 0 2.3.9 3.4.9 1.1 0 1.8-.9 3.4-.9 1.3 0 2.7.7 3.6 1.9-3.2 1.8-2.7 6.3.6 7.6z"
                  fill="#fff"
                />

              </svg>

              <span className="store-badge-text">

                <small>
                  Download on the
                </small>

                App Store

              </span>

            </a>

          </div>

        </div>

        {/* =========================
            APP SCREENSHOTS
        ========================= */}

        <div className="app-download-illustration">

          <div className="phone phone-back">

            <div
              className="phone-notch"
              aria-hidden="true"
            />

            <div className="phone-screen">

              <img
                src={urbanHomeyExploreScreen}
                alt="UrbanHomey mobile app explore screen for discovering compatible flatmates and rooms"
                className="phone-screenshot"
                width="390"
                height="844"
                loading="lazy"
                decoding="async"
              />

            </div>

          </div>

          <div className="phone phone-front">

            <div
              className="phone-notch"
              aria-hidden="true"
            />

            <div className="phone-screen">

              <img
                src={urbanHomeyHomeScreen}
                alt="UrbanHomey mobile app home screen for finding flatmates, roommates and shared rooms"
                className="phone-screenshot"
                width="390"
                height="844"
                loading="lazy"
                decoding="async"
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CITY INTERNAL LINKS
      ===================================================== */}

      <section
        className="popular-city-section"
        aria-labelledby="popular-city-heading"
      >

        <div className="popular-city-copy">

          <span className="popular-city-eyebrow">
            Explore by Location
          </span>

          <h2 id="popular-city-heading">
            Find Flatmates and Rooms in Indian Cities
          </h2>

          <p>
            Explore UrbanHomey city pages to discover compatible
            flatmates, roommates, shared accommodation and rooms
            across supported locations in India.
          </p>

        </div>

        <nav
          className="popular-city-links"
          aria-label="UrbanHomey city pages"
        >

          {cityList.map((city) => (

            <Link
              key={city.slug}
              to={`/city/${city.slug}`}
              title={`Find flatmates, roommates and rooms in ${city.name}`}
            >
              Find Flatmates in {city.name}
            </Link>

          ))}

        </nav>

        <Link
          to="/cities"
          className="all-cities-link"
          title="Explore all UrbanHomey city pages"
        >
          Explore All Cities

          <span aria-hidden="true">
            &rsaquo;
          </span>
        </Link>

      </section>

      {/* =====================================================
          RENTAL AGREEMENT CTA
      ===================================================== */}

      <section
        className="agreement-section"
        aria-labelledby="agreement-heading"
      >

        <div className="agreement-copy">

          <span className="agreement-eyebrow">
            Rental Agreement Service
          </span>

          <h2
            className="agreement-heading"
            id="agreement-heading"
          >
            Create Your Rental Agreement Online
          </h2>

          <p className="agreement-subtext">
            Create a rental agreement online through UrbanHomey&apos;s
            rental agreement service and review the available process,
            requirements and service information before proceeding.
          </p>

          <Link
            to="/rental-agreement"
            className="agreement-cta"
            title="Create a rental agreement online"
          >
            Create Rental Agreement

            <span aria-hidden="true">
              &rsaquo;
            </span>
          </Link>

        </div>

        <div
          className="agreement-illustration"
          aria-hidden="true"
        >

          <svg
            viewBox="0 0 420 360"
            xmlns="http://www.w3.org/2000/svg"
          >

            {/* DOCUMENT */}

            <rect
              x="70"
              y="20"
              width="230"
              height="300"
              rx="18"
              fill="#E9F9EF"
            />

            <path
              d="M250 20 H300 V70 Z"
              fill="#22C55E"
              opacity="0.25"
            />

            <rect
              x="100"
              y="55"
              width="140"
              height="16"
              rx="8"
              fill="#BBF0D2"
            />

            <rect
              x="100"
              y="95"
              width="20"
              height="20"
              rx="5"
              fill="#D9D6FE"
            />

            <rect
              x="130"
              y="100"
              width="120"
              height="10"
              rx="5"
              fill="#D9D6FE"
            />

            <rect
              x="100"
              y="135"
              width="20"
              height="20"
              rx="5"
              fill="#D9D6FE"
            />

            <rect
              x="130"
              y="140"
              width="120"
              height="10"
              rx="5"
              fill="#D9D6FE"
            />

            <rect
              x="100"
              y="175"
              width="20"
              height="20"
              rx="5"
              fill="#D9D6FE"
            />

            <rect
              x="130"
              y="180"
              width="90"
              height="10"
              rx="5"
              fill="#D9D6FE"
            />

            {/* SIGNATURE */}

            <path
              d="M100 250 Q120 230 140 250 T180 250 T220 250"
              stroke="#1B2A41"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* PERSON A */}

            <g transform="translate(20,190)">

              <circle
                cx="40"
                cy="20"
                r="22"
                fill="#F24BA5"
              />

              <rect
                x="14"
                y="42"
                width="52"
                height="90"
                rx="22"
                fill="#F472B6"
              />

            </g>

            {/* PERSON B */}

            <g transform="translate(300,170)">

              <circle
                cx="40"
                cy="20"
                r="22"
                fill="#7B3FF2"
              />

              <rect
                x="14"
                y="42"
                width="52"
                height="90"
                rx="22"
                fill="#A13FEA"
              />

              <rect
                x="60"
                y="78"
                width="26"
                height="20"
                rx="4"
                fill="#F24BA5"
              />

            </g>

            {/* CONNECTOR */}

            <rect
              x="86"
              y="248"
              width="60"
              height="14"
              rx="7"
              fill="#FBBF24"
            />

          </svg>

        </div>

      </section>

    </main>
  );
};

export default Downloadpage;