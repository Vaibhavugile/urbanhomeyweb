
import React from "react";

import {
  FaUserPlus,
  FaShieldAlt,
  FaKey,
} from "react-icons/fa";

import { Sparkles } from "lucide-react";

import "./WorksSection.css";


function WorksSection() {
  const steps = [
    {
      id: 1,

      icon: <FaUserPlus aria-hidden="true" />,

      title: "Create Your Flatmate Profile",

      text:
        "Create your UrbanHomey profile and share your preferred location, budget, lifestyle, daily habits, and living preferences to help you discover more compatible flatmates and roommates.",
    },

    {
      id: 2,

      icon: (
        <Sparkles
          size={28}
          aria-hidden="true"
        />
      ),

      title: "Discover Compatible Matches",

      text:
        "Explore potential flatmates and roommates based on compatibility factors such as location, budget, lifestyle preferences, habits, and shared-living expectations.",
    },

    {
      id: 3,

      icon: <FaShieldAlt aria-hidden="true" />,

      title: "Connect and Chat Safely",

      text:
        "Review profiles, discover shared-living preferences, and connect through UrbanHomey before deciding whether a potential flatmate or roommate is right for you.",
    },

    {
      id: 4,

      icon: <FaKey aria-hidden="true" />,

      title: "Find Your Shared Home",

      text:
        "Choose a compatible flatmate, roommate, room for rent, or shared home that matches your needs and begin your next shared-living experience.",
    },
  ];


  return (
    <section
      id="how-it-works"
      className="works-section"
      aria-labelledby="how-urbanhomey-works-heading"
    >

      {/* =========================
          SECTION HEADER
      ========================= */}

      <div className="works-section-header">

        <h2 id="how-urbanhomey-works-heading">
          How UrbanHomey Helps You Find Compatible Flatmates and Rooms
        </h2>


        <p>
          UrbanHomey makes it easier for students and working
          professionals to discover flatmates, roommates, rooms for rent,
          and shared homes based on location, budget, lifestyle, habits,
          and living preferences.
        </p>

      </div>



      {/* =========================
          HOW IT WORKS TIMELINE
      ========================= */}

      <ol
        className="timeline"
        aria-label="Steps for finding flatmates, roommates, and shared homes on UrbanHomey"
      >

        {steps.map((item, index) => (

          <li
            className="timeline-item"
            key={item.id}
          >

            {/* =========================
                STEP VISUAL
            ========================= */}

            <div
              className="timeline-left"
              aria-hidden="true"
            >

              <div className="icon-box">
                {item.icon}
              </div>


              {index !== steps.length - 1 && (

                <div className="line"></div>

              )}

            </div>



            {/* =========================
                STEP CONTENT
            ========================= */}

            <div className="timeline-content">

              <span className="timeline-step-label">
                Step {index + 1}
              </span>


              <h3>
                {item.title}
              </h3>


              <p>
                {item.text}
              </p>

            </div>

          </li>

        ))}

      </ol>

    </section>
  );
}


export default WorksSection;

