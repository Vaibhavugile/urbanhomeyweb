
import React from "react";
import { Link } from "react-router-dom";

import "./HomeBanner.css";


function HomeBanner() {
  return (
    <section
      className="home-banner"
      aria-labelledby="urbanhomey-home-heading"
    >

      {/* =========================
          LEFT CONTENT
      ========================= */}

      <div className="banner-content">

        {/* ONLY MAIN H1 ON HOMEPAGE */}

        <h1 id="urbanhomey-home-heading">
          Find Flatmates, Roommates & Rooms for Rent Across India
          <br />

          <span>
            Find Compatible People, Not Just a Place to Stay.
          </span>
        </h1>


        <p>
          UrbanHomey helps students and working professionals find
          compatible flatmates, roommates, rooms for rent, and shared
          homes across India. Discover people based on location, budget,
          lifestyle, daily habits, and living preferences before deciding
          who you want to live with.
        </p>


        {/* =========================
            PRIMARY ACTIONS
        ========================= */}

        <div className="banner-buttons">

          <Link
            to="/login"
            className="start-btn"
            aria-label="Get started with UrbanHomey"
          >
            Get Started
          </Link>


          <Link
            to="/matches"
            className="explore-btn"
            aria-label="Explore compatible flatmate and roommate matches"
          >
            Explore Matches
          </Link>

        </div>


        {/* =========================
            COMMUNITY PREVIEW
        ========================= */}

        <div className="banner-users">

          <div
            className="users"
            aria-label="UrbanHomey flatmate and roommate community"
          >

            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face"
              alt="Young professional searching for compatible flatmates"
              width="200"
              height="200"
              loading="eager"
              fetchPriority="high"
            />


            <img
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=200&h=200&fit=crop&crop=face"
              alt="Working professional looking for compatible roommates"
              width="200"
              height="200"
              loading="lazy"
            />


            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face"
              alt="Student searching for rooms for rent and shared homes"
              width="200"
              height="200"
              loading="lazy"
            />

          </div>


          <p>
            Discover compatible flatmates, roommates, rooms for rent,
            and shared-living opportunities in cities across India.
          </p>

        </div>

      </div>



      {/* =========================
          RIGHT HERO VISUAL
      ========================= */}

      <div
        className="hero-visual"
        aria-label="UrbanHomey compatibility matching illustration"
      >

        {/* DECORATIVE ELEMENTS */}

        <div
          className="hero-glow"
          aria-hidden="true"
        ></div>


        <div
          className="connection-line line-1"
          aria-hidden="true"
        ></div>


        <div
          className="connection-line line-2"
          aria-hidden="true"
        ></div>



        {/* =========================
            TOP PROFILE CARD
        ========================= */}

        <div className="profile-card top-card-1">

          <img
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face"
            alt="Sample flatmate profile interested in pet-friendly shared homes"
            width="200"
            height="200"
            loading="lazy"
          />

          <h3>Priya</h3>

          <span>Pet Friendly</span>

        </div>



        {/* =========================
            TOP PROFILE CARD
        ========================= */}

        <div className="profile-card top-card-2">

          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face"
            alt="Sample roommate profile interested in fitness and shared living"
            width="200"
            height="200"
            loading="lazy"
          />

          <h3>Kabir</h3>

          <span>Fitness Lover</span>

        </div>



        {/* =========================
            MATCH CIRCLE
        ========================= */}

        <div
          className="match-circle"
          aria-label="Example of a high flatmate compatibility match"
        >

          <span>100%</span>

          <small>Match</small>

        </div>



        {/* =========================
            BOTTOM PROFILE CARD
        ========================= */}

        <div className="profile-card bottom-card-1">

          <img
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face"
            alt="Sample flatmate profile for a UI designer"
            width="200"
            height="200"
            loading="lazy"
          />

          <h3>Aarohi</h3>

          <span>UI Designer</span>

        </div>



        {/* =========================
            BOTTOM PROFILE CARD
        ========================= */}

        <div className="profile-card bottom-card-2">

          <img
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=200&h=200&fit=crop&crop=face"
            alt="Sample roommate profile for a software engineer"
            width="200"
            height="200"
            loading="lazy"
          />

          <h3>Arjun</h3>

          <span>Software Engineer</span>

        </div>

      </div>

    </section>
  );
}


export default HomeBanner;
