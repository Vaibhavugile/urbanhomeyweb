import React from "react";
import "./RecentMatchesHeader.css";

import { FaArrowRight } from "react-icons/fa";

function RecentMatchesHeader() {

  return (

    <div className="recent-header">

      <h1>
        Recent Matches
      </h1>

      <button className="view-all-btn">

        View All

        <FaArrowRight />

      </button>

    </div>

  );
}

export default RecentMatchesHeader;