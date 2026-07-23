import React from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

function HeroSection() {

  const navigate = useNavigate();

  return (
    <div className="hero-section">

      {/* TITLE */}

      <h2>
        Find Your Perfect
        <span>
          Urban Roommate
        </span>
      </h2>

      {/* DESCRIPTION */}

      <p>
        The modern way to match with people
        who share your lifestyle, budget,
        and urban energy.
      </p>

      {/* BUTTONS */}

      <div className="hero-buttons">

        <button
          className="primary-btn"
          onClick={() => navigate("/matches")}
        >
          Start Matching
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate("/search")}
        >
          Explore Listings
        </button>

      </div>

      {/* USERS */}

      <div className="verified-users">

        <span className="verified-icon">
          ✦
        </span>

        <span>
          10,000+ verified users
        </span>

      </div>

    </div>
  );
}

export default HeroSection;