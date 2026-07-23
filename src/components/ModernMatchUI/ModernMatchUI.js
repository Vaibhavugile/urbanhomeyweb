import React, { useState } from "react";
import "./ModernMatchUI.css";

import {
  FaSlidersH,
  FaMapMarkerAlt,
  FaHome,
  FaTimes,
  FaHeart,
  FaStar,
  FaCommentAlt,
} from "react-icons/fa";

import MainProfile from "./person-main.jpg";
import PriyaImg from "./person1.jpg";
import AlexImg from "./person2.jpg";
import NehaImg from "./person3.jpg";

function ModernMatchUI() {

  const [budget, setBudget] = useState(50000);

  const [location, setLocation] = useState("Brooklyn, NY");

  const [profileType, setProfileType] =
    useState("Has Flat");

  const [selectedTags, setSelectedTags] =
    useState(["Pets"]);

  const lifestyleTags = [
    "Pets",
    "Non-Smoker",
    "Gym",
    "Quiet",
    "Veg",
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter(
          (item) => item !== tag
        )
      );
    } else {
      setSelectedTags([
        ...selectedTags,
        tag,
      ]);
    }
  };

  const handleApplyFilters = () => {
    console.log({
      budget,
      location,
      profileType,
      selectedTags,
    });

    alert("Filters Applied!");
  };

  const suggestions = [
    {
      name: "Priya",
      age: 24,
      role: "Product Designer",
      match: "95%",
      image: PriyaImg,
      tags: ["Veg", "Quiet"],
    },
    {
      name: "Alex",
      age: 27,
      role: "Software Engineer",
      match: "88%",
      image: AlexImg,
      tags: ["Runner", "Night Owl"],
    },
    {
      name: "Neha",
      age: 25,
      role: "Marketing Analyst",
      match: "90%",
      image: NehaImg,
      tags: ["Artist", "Extrovert"],
    },
  ];

  return (
    <div className="modern-match-ui">

      {/* FILTER PANEL */}

      <div className="filter-panel">

        <div>

          <div className="filter-title">
            <FaSlidersH />
            <h2>Filters</h2>
          </div>

          <p className="subtitle">
            Refine your connections
          </p>

          {/* Budget */}

          <div className="filter-group">

            <label>
              Budget Range
            </label>

            <input
              type="range"
              min="10000"
              max="100000"
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
            />

            <div className="range-values">
              <span>₹10k</span>

              <span>
                ₹{Number(budget).toLocaleString()}
              </span>

              <span>₹100k+</span>
            </div>

          </div>

          {/* Location */}

          <div className="filter-group">

            <label>
              <FaMapMarkerAlt />
              Location
            </label>

            <select
              value={location}
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }
            >
              <option>
                Brooklyn, NY
              </option>

              <option>
                Queens, NY
              </option>

              <option>
                Manhattan, NY
              </option>

              <option>
                Jersey City, NJ
              </option>
            </select>

          </div>

          {/* Lifestyle */}

          <div className="filter-group">

            <label>
              Lifestyle
            </label>

            <div className="tags">

              {lifestyleTags.map(
                (tag) => (
                  <span
                    key={tag}
                    onClick={() =>
                      toggleTag(tag)
                    }
                    className={
                      selectedTags.includes(
                        tag
                      )
                        ? "active-tag"
                        : ""
                    }
                  >
                    {tag}
                  </span>
                )
              )}

            </div>

          </div>

          {/* Profile Type */}

          <div className="filter-group">

            <label>
              Profile Type
            </label>

            <div className="profile-buttons">

              <button
                className={
                  profileType ===
                  "Has Flat"
                    ? "active-btn"
                    : ""
                }
                onClick={() =>
                  setProfileType(
                    "Has Flat"
                  )
                }
              >
                Has Flat
              </button>

              <button
                className={
                  profileType ===
                  "Looking"
                    ? "active-btn"
                    : ""
                }
                onClick={() =>
                  setProfileType(
                    "Looking"
                  )
                }
              >
                Looking
              </button>

            </div>

          </div>

        </div>

        <button
          className="apply-btn"
          onClick={
            handleApplyFilters
          }
        >
          Apply Filters
        </button>

      </div>

      {/* CENTER CARD */}

      <div className="card-wrapper">

        <div className="main-card">

          <div className="profile-image-section">

            <img
              src={MainProfile}
              alt="Sarah"
            />

            <div className="top-badges">

              <span className="match-badge">
                98% Match
              </span>

              <span className="flat-badge">
                <FaHome />
                Has Flat
              </span>

            </div>

            <div className="profile-info">

              <h1>
                Sarah <span>26</span>
              </h1>

              <p className="location">
                <FaMapMarkerAlt />
                Brooklyn, NY
              </p>

              <p className="description">
                Friendly, organized and
                loves creating cozy living
                spaces. Looking for someone
                who enjoys peaceful evenings
                and meaningful
                conversations.
              </p>

              <div className="interest-tags">

                <span>
                  Quiet Nights
                </span>

                <span>
                  Plant Lover
                </span>

                <span>
                  Coffee Lover
                </span>

                <span>
                  Weekend Brunch
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ACTION BUTTONS */}

        <div className="action-buttons">

          <button className="reject-btn">
            <FaTimes />
          </button>

          <button className="like-btn">
            <FaHeart />
          </button>

          <button className="star-btn">
            <FaStar />
          </button>

          <button className="chat-btn">
            <FaCommentAlt />
          </button>

        </div>

      </div>

      {/* SUGGESTIONS */}

      <div className="suggestions">

        <h2>
          Suggested Matches
        </h2>

        {suggestions.map(
          (item, index) => (
            <div
              className="suggestion-card"
              key={index}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="suggestion-info">

                <div className="top-row">

                  <h3>
                    {item.name},{" "}
                    {item.age}
                  </h3>

                  <span className="percent">
                    {item.match}
                  </span>

                </div>

                <p>
                  {item.role}
                </p>

                <div className="mini-tags">

                  {item.tags.map(
                    (
                      tag,
                      i
                    ) => (
                      <span
                        key={i}
                      >
                        {tag}
                      </span>
                    )
                  )}

                </div>

              </div>

            </div>
          )
        )}

        <button className="view-btn">
          View All Potential Matches
        </button>

      </div>

    </div>
  );
}

export default ModernMatchUI;