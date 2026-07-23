import React from "react";
import "./MatchFooter.css";

function MatchFooter() {

  return (

    <div className="match-footer">

      {/* LEFT */}

      <div className="footer-left">

        <h1>
          UrbanHomey
        </h1>

        <p>
          © 2026 UrbanHomey. Modern Urban Living.
        </p>

      </div>

      {/* RIGHT */}

      <div className="footer-right">

        <a href="/">
          About
        </a>

        <a href="/">
          Privacy
        </a>

        <a href="/">
          Terms
        </a>

        <a href="/">
          Support
        </a>

      </div>

    </div>

  );
}

export default MatchFooter;