
import React, { useEffect, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./Header.css";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();


  /* =========================
     CLOSE MOBILE MENU
  ========================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* =========================
     CLOSE MENU ON ROUTE CHANGE
  ========================= */

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);


  /* =========================
     SCROLL TO HOME SECTION
  ========================= */

  const scrollToSection = (sectionId) => {
    closeMenu();

    if (location.pathname !== "/") {
      sessionStorage.setItem("scrollTo", sectionId);

      navigate("/");

      return;
    }

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  /* =========================
     DOWNLOAD PAGE
  ========================= */

  const goToDownloadPage = () => {
    closeMenu();

    navigate("/download-app");
  };


  /* =========================
     TOGGLE MOBILE MENU
  ========================= */

  const toggleMenu = () => {
    setMenuOpen((currentValue) => !currentValue);
  };


  return (
    <header className="header">

      {/* =========================
          LOGO
      ========================= */}

      <div className="logo">

        <Link
          to="/"
          onClick={closeMenu}
          aria-label="UrbanHomey home"
        >

          <img
            src="/mainlogo.png"
            alt="UrbanHomey - Find compatible flatmates, roommates and rooms"
            className="logo-img"
            width="180"
            height="60"
          />

        </Link>

      </div>


      {/* =========================
          MOBILE MENU BUTTON
      ========================= */}

      <button
        type="button"
        className="hamburger"
        onClick={toggleMenu}
        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      >
        <span aria-hidden="true">
          {menuOpen ? "✕" : "☰"}
        </span>
      </button>


      {/* =========================
          MAIN NAVIGATION
      ========================= */}

      <nav
        id="main-navigation"
        className={
          menuOpen
            ? "nav-links active"
            : "nav-links"
        }
        aria-label="Main navigation"
      >

        {/* HOME */}

        <Link
          to="/"
          onClick={closeMenu}
        >
          Home
        </Link>


        {/* HOW IT WORKS */}

        <a
          href="/#how-it-works"
          onClick={(event) => {
            event.preventDefault();

            scrollToSection("how-it-works");
          }}
        >
          How It Works
        </a>


        {/* MATCHES */}

        <a
          href="/#matches"
          onClick={(event) => {
            event.preventDefault();

            scrollToSection("matches");
          }}
        >
          Matches
        </a>


        {/* REVIEWS */}

        <a
          href="/#reviews"
          onClick={(event) => {
            event.preventDefault();

            scrollToSection("reviews");
          }}
        >
          Reviews
        </a>


        {/* BLOGS */}

        <Link
          to="/blogs"
          onClick={closeMenu}
        >
          Blogs
        </Link>


        {/* =========================
            MOBILE DOWNLOAD BUTTON
        ========================= */}

        <div className="mobile-menu-buttons">

          <button
            type="button"
            className="mobile-start-btn"
            onClick={goToDownloadPage}
          >
            Download App
          </button>

        </div>

      </nav>


      {/* =========================
          DESKTOP DOWNLOAD BUTTON
      ========================= */}

      <div className="header-buttons">

        <button
          type="button"
          className="start-btn"
          onClick={goToDownloadPage}
        >
          Download App
        </button>

      </div>

    </header>
  );
};


export default Header;

