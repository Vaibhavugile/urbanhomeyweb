
import React from "react";
import { Link } from "react-router-dom";

import "./OptionCards.css";


function OptionCards() {
  return (
    <section
      className="option-section"
      aria-labelledby="urbanhomey-options-heading"
    >

      {/* =========================
          SECTION HEADER
      ========================= */}

      <div className="option-section-header">

        <h2 id="urbanhomey-options-heading">
          Find a Room or List Your Space on UrbanHomey
        </h2>

        <p>
          Whether you are searching for a compatible flatmate,
          looking for a room for rent, or have a shared space
          available, UrbanHomey helps you connect with people
          based on location, budget, lifestyle, and living
          preferences.
        </p>

      </div>



      {/* =========================
          OPTION CARDS
      ========================= */}

      <div className="option-cards-wrapper">


        {/* =========================
            LIST YOUR SPACE
        ========================= */}

        <Link
          to="/list-room"
          className="option-card"
          aria-label="List your room or shared space on UrbanHomey"
        >

          <div
            className="option-icon"
            aria-hidden="true"
          >
            🏠
          </div>


          <div className="option-content">

            <h3>
              List Your Room or Shared Space
            </h3>


            <p>
              Have a room, flat, or shared home available?
              List your space on UrbanHomey and connect with
              people searching for compatible flatmates and
              roommates.
            </p>


            <span className="option-badge">
              LIST YOUR SPACE
            </span>

          </div>

        </Link>



        {/* =========================
            FIND A ROOM
        ========================= */}

        <Link
          to="/find-room"
          className="option-card"
          aria-label="Find rooms for rent and compatible flatmates on UrbanHomey"
        >

          <div
            className="option-icon"
            aria-hidden="true"
          >
            🔍
          </div>


          <div className="option-content">

            <h3>
              Find a Room and Compatible Flatmates
            </h3>


            <p>
              Explore rooms for rent, shared flats, and potential
              flatmates based on your preferred location, budget,
              lifestyle, habits, and living preferences.
            </p>


            <span className="option-badge">
              FIND YOUR HOME
            </span>

          </div>

        </Link>

      </div>

    </section>
  );
}


export default OptionCards;

