import React from "react";
import "./BottomNavbar.css";

import { useNavigate, useLocation } from "react-router-dom";

import {
  FaCompass,
  FaHeart,
  FaRegCommentDots,
  FaRegUser,
} from "react-icons/fa";

function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-navbar">

      {/* Discover */}
      <div
        className={`nav-item ${
          location.pathname === "/" ? "active-nav" : ""
        }`}
        onClick={() => navigate("/")}
      >
        <div className="nav-icon">
          <FaCompass />
        </div>

        <span>Discover</span>
      </div>

      {/* Matches */}
      <div
        className={`nav-item ${
          location.pathname === "/matches"
            ? "active-nav"
            : ""
        }`}
        onClick={() => navigate("/matches")}
      >
        <div className="nav-icon">
          <FaHeart />
        </div>

        <span>Matches</span>
      </div>

      {/* Chat */}
      <div
        className="nav-item"
        onClick={() => navigate("/chat")}
      >
        <div className="nav-icon">
          <FaRegCommentDots />
        </div>

        <span>Chat</span>
      </div>

      {/* Profile */}
      <div
        className="nav-item"
        onClick={() => navigate("/profile")}
      >
        <div className="nav-icon">
          <FaRegUser />
        </div>

        <span>Profile</span>
      </div>

    </div>
  );
}

export default BottomNavbar;