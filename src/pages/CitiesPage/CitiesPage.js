import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  MapPin,
  Search,
} from "lucide-react";

import SEO from "../../components/SEO/SEO";
import PageLayout from "../../components/PageLayout/PageLayout";

import { cityList } from "../../data/cities";

import "./CitiesPage.css";

const SITE_URL = "https://www.urbanhomey.com";

/* =========================================================
   CITIES PAGE
========================================================= */

function CitiesPage() {
  const [search, setSearch] = useState("");

  /* =======================================================
     FILTER CITIES
  ======================================================= */

  const filteredCities = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return cityList;
    }

    return cityList.filter((city) => {
      const searchableText = [
        city.name,
        city.state,
        ...(city.areas || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [search]);

  /* =======================================================
     STATS
  ======================================================= */

  const totalCities = cityList.length;

  const totalAreas = cityList.reduce(
    (total, city) =>
      total + (Array.isArray(city.areas) ? city.areas.length : 0),
    0
  );

  /* =======================================================
     SEO
  ======================================================= */

  const title =
    "Find Flatmates, Roommates & Rooms Across Cities in India | UrbanHomey";

  const description =
    "Explore UrbanHomey city guides to find compatible flatmates, roommates, rooms for rent and shared accommodation across major cities in India including Pune, Bangalore, Hyderabad, Mumbai, Delhi, Chennai and more.";

  const keywords = [
    "find flatmates in India",
    "find roommates in India",
    "flatmate finder India",
    "roommate finder India",
    "rooms for rent in India",
    "shared accommodation India",
    "shared rooms India",
    "flatmates near me",
    "roommates near me",
    "find rooms near me",
    "UrbanHomey cities",
    ...cityList.flatMap((city) => [
      `flatmates in ${city.name}`,
      `roommates in ${city.name}`,
      `rooms for rent in ${city.name}`,
      `shared accommodation in ${city.name}`,
    ]),
  ].join(", ");

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
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",

    name: "Cities Where UrbanHomey Helps People Find Flatmates and Rooms",

    description:
      "Explore city guides for finding compatible flatmates, roommates, rooms and shared accommodation across India.",

    numberOfItems: cityList.length,

    itemListElement: cityList.map((city, index) => ({
      "@type": "ListItem",

      position: index + 1,

      name: city.name,

      url: `${SITE_URL}/city/${city.slug}`,

      item: {
        "@type": "WebPage",

        name: city.title,

        url: `${SITE_URL}/city/${city.slug}`,

        description: city.description,

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
      },
    })),
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    name: title,

    description,

    url: `${SITE_URL}/cities`,

    inLanguage: "en-IN",

    isPartOf: {
      "@type": "WebSite",
      name: "UrbanHomey",
      url: `${SITE_URL}/`,
    },

    mainEntity: {
      "@type": "ItemList",

      numberOfItems: cityList.length,

      itemListElement: cityList.map((city, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: city.name,
        url: `${SITE_URL}/city/${city.slug}`,
      })),
    },
  };

  const schema = [
    breadcrumbSchema,
    collectionPageSchema,
    itemListSchema,
  ];

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <PageLayout>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        url={`${SITE_URL}/cities`}
        image="/og-image.jpg"
        type="website"
        schema={schema}
      />

      <main className="cities-page">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav
          className="cities-breadcrumb"
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

            <li aria-current="page">
              Cities
            </li>
          </ol>
        </nav>


        {/* =================================================
            HERO
        ================================================= */}

        <section className="cities-hero">

          <div className="cities-hero-content">

            <span className="cities-eyebrow">
              Explore Shared Living Across India
            </span>

            <h1>
              Find Flatmates, Roommates and Rooms Across India
            </h1>

            <p>
              Explore UrbanHomey city guides to discover
              compatible flatmates, roommates, rooms for rent
              and shared-living opportunities across major
              cities in India.
            </p>


            {/* SEARCH */}

            <div className="cities-search-wrapper">

              <Search
                size={20}
                aria-hidden="true"
              />

              <label
                htmlFor="city-search"
                className="cities-visually-hidden"
              >
                Search cities or areas
              </label>

              <input
                id="city-search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by city or area..."
                autoComplete="off"
              />

              {search && (
                <button
                  type="button"
                  className="cities-search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear city search"
                >
                  ×
                </button>
              )}

            </div>


            {/* STATS */}

            <div className="cities-hero-stats">

              <div>
                <strong>
                  {totalCities}+
                </strong>

                <span>
                  City Guides
                </span>
              </div>


              <div>
                <strong>
                  {totalAreas}+
                </strong>

                <span>
                  Popular Areas
                </span>
              </div>


              <div>
                <strong>
                  India
                </strong>

                <span>
                  Growing Network
                </span>
              </div>

            </div>

          </div>


          {/* HERO SIDE CARD */}

          <aside className="cities-hero-card">

            <span className="cities-hero-card-label">
              Why Search by City?
            </span>

            <h2>
              Start with the Location That Matters to You
            </h2>

            <p>
              Compare popular neighborhoods, explore
              shared-living guides and begin your search for
              compatible flatmates and rooms in your preferred
              city.
            </p>


            <div className="cities-hero-features">

              <div>
                <MapPin
                  size={20}
                  aria-hidden="true"
                />

                <span>
                  Explore popular residential areas
                </span>
              </div>


              <div>
                <Building2
                  size={20}
                  aria-hidden="true"
                />

                <span>
                  Discover rooms and shared accommodation
                </span>
              </div>


              <div>
                <Search
                  size={20}
                  aria-hidden="true"
                />

                <span>
                  Search based on your preferred location
                </span>
              </div>

            </div>

          </aside>

        </section>


        {/* =================================================
            CITIES LIST
        ================================================= */}

        <section
          className="cities-list-section"
          aria-labelledby="cities-list-heading"
        >

          <div className="cities-section-heading">

            <span>
              Explore Locations
            </span>

            <h2 id="cities-list-heading">
              Popular Cities for Finding Flatmates and Rooms
            </h2>

            <p>
              Choose a city to explore popular areas,
              flatmate guides, roommate opportunities and
              shared accommodation resources.
            </p>

          </div>


          {/* SEARCH RESULTS */}

          <div
            className="cities-results-header"
            aria-live="polite"
          >

            <p>
              Showing{" "}
              <strong>
                {filteredCities.length}
              </strong>{" "}
              {filteredCities.length === 1
                ? "city"
                : "cities"}
            </p>

          </div>


          {filteredCities.length > 0 ? (

            <div className="cities-grid">

              {filteredCities.map((city, index) => (

                <article
                  className="cities-card"
                  key={city.slug}
                >

                  <div className="cities-card-top">

                    <span className="cities-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="cities-card-state">
                      {city.state}
                    </span>

                  </div>


                  <div className="cities-card-content">

                    <MapPin
                      className="cities-card-icon"
                      size={28}
                      aria-hidden="true"
                    />

                    <h2>
                      <Link
                        to={`/city/${city.slug}`}
                        title={`Find flatmates, roommates and rooms in ${city.name}`}
                      >
                        {city.name}
                      </Link>
                    </h2>

                    <p>
                      {city.shortDescription}
                    </p>


                    <div
                      className="cities-card-areas"
                      aria-label={`Popular areas in ${city.name}`}
                    >

                      {city.areas
                        .slice(0, 4)
                        .map((area) => (

                          <span key={area}>
                            {area}
                          </span>

                        ))}

                    </div>

                  </div>


                  <Link
                    to={`/city/${city.slug}`}
                    className="cities-card-link"
                    aria-label={`Explore flatmates, roommates and rooms in ${city.name}`}
                  >
                    Explore {city.name}

                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                    />

                  </Link>

                </article>

              ))}

            </div>

          ) : (

            <div className="cities-empty-state">

              <MapPin
                size={34}
                aria-hidden="true"
              />

              <h2>
                No cities found
              </h2>

              <p>
                We could not find a city or area matching
                "{search}". Try another city name or
                neighborhood.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
              >
                View All Cities
              </button>

            </div>

          )}

        </section>


        {/* =================================================
            SEO CONTENT
        ================================================= */}

        <section className="cities-content-section">

          <div className="cities-section-heading">

            <span>
              Find Better Shared-Living Opportunities
            </span>

            <h2>
              Search for Compatible Flatmates and Rooms by City
            </h2>

          </div>


          <div className="cities-content-grid">

            <article>

              <h3>
                Find Flatmates and Roommates Across India
              </h3>

              <p>
                Moving to a new city, starting college or
                changing jobs can make finding suitable shared
                accommodation difficult. The right flatmate is
                not determined by rent and location alone.
              </p>

              <p>
                Daily schedules, cleanliness, food preferences,
                social habits, guests, pets, smoking, drinking
                preferences and household responsibilities can
                influence whether people are comfortable living
                together.
              </p>

            </article>


            <article>

              <h3>
                Explore Rooms and Shared Accommodation
              </h3>

              <p>
                UrbanHomey city guides help people begin their
                shared-living search around popular residential,
                employment and education hubs across major
                Indian cities.
              </p>

              <p>
                Choose your preferred city, explore popular
                neighborhoods and continue to available
                flatmate, roommate and room discovery options
                based on your location and shared-living needs.
              </p>

            </article>

          </div>

        </section>


        {/* =================================================
            HOW TO START
        ================================================= */}

        <section className="cities-how-section">

          <div className="cities-section-heading">

            <span>
              Start Your Search
            </span>

            <h2>
              How to Find Shared Living with UrbanHomey
            </h2>

          </div>


          <div className="cities-how-grid">

            <article>

              <span>01</span>

              <h3>
                Choose Your City
              </h3>

              <p>
                Select the city where you want to find
                flatmates, roommates, rooms or shared
                accommodation.
              </p>

            </article>


            <article>

              <span>02</span>

              <h3>
                Explore Popular Areas
              </h3>

              <p>
                Discover neighborhoods based on your workplace,
                college, commute preferences and rental needs.
              </p>

            </article>


            <article>

              <span>03</span>

              <h3>
                Find Compatible People
              </h3>

              <p>
                Explore shared-living opportunities with
                attention to location, budget and lifestyle
                preferences.
              </p>

            </article>


            <article>

              <span>04</span>

              <h3>
                Connect Carefully
              </h3>

              <p>
                Discuss rent, daily habits, household
                expectations and important details before
                making your decision.
              </p>

            </article>

          </div>

        </section>


        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="cities-final-cta">

          <span>
            Find Your Next Shared Home
          </span>

          <h2>
            Start Exploring Flatmates, Roommates and Rooms
          </h2>

          <p>
            Choose your preferred city and begin exploring
            compatible people and shared-living opportunities
            with UrbanHomey.
          </p>

          <div className="cities-final-actions">

            <Link
              to="/matches"
              className="cities-primary-btn"
            >
              Explore Matches
            </Link>

            <Link
              to="/find-room"
              className="cities-secondary-btn"
            >
              Find a Room
            </Link>

          </div>

        </section>

      </main>
    </PageLayout>
  );
}

export default CitiesPage;