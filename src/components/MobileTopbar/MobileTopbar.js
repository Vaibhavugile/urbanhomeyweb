import React from "react";
import "./MobileTopbar.css";

import { FaBell } from "react-icons/fa";

import ProfileImg from "../MatchCards/person2.jpg";

function MobileTopbar() {
  return (
    <div className="mobile-topbar">

      {/* LOGO */}

      <div className="logo">
        <img src="/mainlogo.jpeg" alt="UrbanHomey" className="logo-img" />
      </div>

      {/* RIGHT */}

      <div className="mobile-right">

        <FaBell className="mobile-bell" />

        <img
          src={ProfileImg}
          alt="profile"
          className="mobile-profile"
        />

      </div>

    </div>
  );
}

export default MobileTopbar;