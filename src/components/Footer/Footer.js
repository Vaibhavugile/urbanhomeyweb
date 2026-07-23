import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

import {
  FaGlobe,
  FaUsers,
  FaSearch,
} from "react-icons/fa";

import { cityList } from "../../data/cities";


function ModernFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="modern-footer"
      aria-label="UrbanHomey website footer"
    >

      <div className="footer-top">


        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="footer-brand">

          <div className="logo">

            <Link
              to="/"
              aria-label="Go to UrbanHomey homepage"
              title="UrbanHomey - Find flatmates, roommates and rooms across India"
            >

              <img
                src="/mainlogo.png"
                alt="UrbanHomey"
                className="logo-img"
                width="180"
                height="60"
                loading="lazy"
                decoding="async"
              />

            </Link>

          </div>


          <p className="footer-brand-description">
            UrbanHomey helps students, working professionals,
            and people relocating across India find compatible
            flatmates, roommates, rooms for rent, shared homes,
            and rental opportunities based on location, budget,
            lifestyle, habits, and compatibility preferences.
          </p>


          <div
            className="footer-socials"
            aria-label="UrbanHomey platform services"
          >

            <div
              className="social-icon"
              title="Discover shared homes across India"
              aria-label="Discover shared homes across India"
            >
              <FaGlobe aria-hidden="true" />
            </div>


            <div
              className="social-icon"
              title="Find compatible flatmates and roommates"
              aria-label="Find compatible flatmates and roommates"
            >
              <FaUsers aria-hidden="true" />
            </div>


            <div
              className="social-icon"
              title="Search rooms and rental listings"
              aria-label="Search rooms and rental listings"
            >
              <FaSearch aria-hidden="true" />
            </div>

          </div>

        </div>



        {/* =====================================================
            FOOTER LINKS
        ===================================================== */}

        <nav
          className="footer-links-wrapper"
          aria-label="UrbanHomey footer navigation"
        >


          {/* =====================================================
              FIND
          ===================================================== */}

          <div className="footer-links">

            <h2>Find</h2>


            <Link
              to="/matches"
              title="Find compatible flatmates and roommates"
            >
              Find Flatmates
            </Link>


            <Link
              to="/find-room"
              title="Search rooms and shared homes"
            >
              Find a Room
            </Link>


            <Link
              to="/list-room"
              title="List your room and find a compatible roommate"
            >
              List Your Room
            </Link>


            <Link
              to="/cities"
              title="Explore all UrbanHomey city pages"
            >
              Explore Cities
            </Link>


            <Link
              to="/blogs"
              title="Read flatmate, roommate and rental guides"
            >
              Flatmate & Rental Guides
            </Link>

          </div>



          {/* =====================================================
              FLATMATES BY CITY
          ===================================================== */}

          <div className="footer-links">

            <h2>Flatmates by City</h2>


            {cityList.map((city) => (

              <Link
                key={`flatmates-${city.slug}`}
                to={`/city/${city.slug}`}
                title={`Find compatible flatmates and roommates in ${city.name}`}
              >
                Flatmates in {city.name}
              </Link>

            ))}

          </div>



          {/* =====================================================
              ROOMS BY CITY
          ===================================================== */}

          <div className="footer-links">

            <h2>Rooms by City</h2>


            {cityList.map((city) => (

              <Link
                key={`rooms-${city.slug}`}
                to={`/city/${city.slug}`}
                title={`Find rooms for rent and shared homes in ${city.name}`}
              >
                Rooms for Rent in {city.name}
              </Link>

            ))}

          </div>



          {/* =====================================================
              COMPANY
          ===================================================== */}

          <div className="footer-links">

            <h2>Company</h2>


            <Link
              to="/about"
              title="Learn more about UrbanHomey"
            >
              About UrbanHomey
            </Link>


            <Link
              to="/contact"
              title="Contact UrbanHomey"
            >
              Contact Us
            </Link>


            <Link
              to="/press"
              title="UrbanHomey press and media information"
            >
              Press
            </Link>


            <Link
              to="/download-app"
              title="Download the UrbanHomey mobile application"
            >
              Download App
            </Link>

          </div>



          {/* =====================================================
              RESOURCES
          ===================================================== */}

          <div className="footer-links">

            <h2>Resources</h2>


            <Link
              to="/support"
              title="Get help and support from UrbanHomey"
            >
              Support
            </Link>


            <Link
              to="/privacy"
              title="Read the UrbanHomey Privacy Policy"
            >
              Privacy Policy
            </Link>


            <Link
              to="/terms"
              title="Read the UrbanHomey Terms and Conditions"
            >
              Terms & Conditions
            </Link>

          </div>

        </nav>

      </div>



      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div
        className="footer-line"
        aria-hidden="true"
      />



      {/* =====================================================
          CITY INTERNAL LINKS
      ===================================================== */}

      



      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div
        className="footer-line footer-line-bottom"
        aria-hidden="true"
      />



      {/* =====================================================
          FOOTER BOTTOM
      ===================================================== */}

      <div className="footer-bottom">


        <nav
          className="footer-bottom-links"
          aria-label="Legal and support navigation"
        >

          <Link to="/privacy">
            Privacy
          </Link>


          <Link to="/terms">
            Terms
          </Link>


          <Link to="/contact">
            Contact
          </Link>


          <Link to="/support">
            Support
          </Link>

        </nav>


        <p>
          © {currentYear} UrbanHomey.
          <br />
          Find compatible flatmates, roommates, rooms for rent,
          and shared homes across India.
        </p>

      </div>

    </footer>
  );
}


export default ModernFooter;