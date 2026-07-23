import React from "react";
import "./LookingSection.css";

import {
  Home,
  Search
} from "lucide-react";

function LookingSection() {

  return (

    <section className="looking-section">

      <h1>
        How are you looking?
      </h1>

      <div className="looking-container">

        {/* Card 1 — Purple (left side of logo) */}

        <div className="looking-card card-purple">

          <div className="icon-box icon-purple">
            <Home size={40} />
          </div>

          <h2>
            Has a Flat
          </h2>

          <p>
            Already have a flat and looking for the
            perfect roommate to share your space
            and expenses with?
          </p>

          <a href="/" className="card-link link-purple">

            List your room

            <span className="arrow">
              →
            </span>

          </a>

        </div>

        {/* Card 2 — Blue (right side of logo) */}

        <div className="looking-card card-blue">

          <div className="icon-box icon-blue">
            <Search size={40} />
          </div>

          <h2>
            Looking for Flat + Flatmates
          </h2>

          <p>
            Searching for both a new place and
            compatible people to live with?
            Find your crew and home here.
          </p>

          <a href="/" className="card-link link-blue">

            Start searching

            <span className="arrow">
              →
            </span>

          </a>

        </div>

      </div>

    </section>
  );
}

export default LookingSection;
