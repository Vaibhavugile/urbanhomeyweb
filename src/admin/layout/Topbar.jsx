import React from "react";
import {
  MdSearch,
  MdNotificationsNone,
  MdLightMode,
  MdAdd,
} from "react-icons/md";

import "./Topbar.css";

function Topbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="topbar">

      <div className="topbar-left">

        <div className="search-box">

          <MdSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search anything..."
          />

        </div>

      </div>

      <div className="topbar-right">

        <span className="today-date">
          {today}
        </span>

        <button className="icon-btn">
          <MdLightMode />
        </button>

        <button className="icon-btn notification-btn">
          <MdNotificationsNone />

          <span className="notification-badge">
            3
          </span>
        </button>

        <button className="create-btn">

          <MdAdd />

          Create

        </button>

      </div>

    </header>
  );
}

export default Topbar;