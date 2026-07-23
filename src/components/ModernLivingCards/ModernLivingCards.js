import React from "react";
import "./ModernLivingCards.css";

import {
  FaShieldAlt,
  FaWallet,
  FaFileSignature,
  FaUsers,
} from "react-icons/fa";

function ModernLivingCards() {

  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Users",
      text: "Rigorous ID checks for ultimate safety.",
      className: "blue-card",
    },

    {
      icon: <FaWallet />,
      title: "Easy Rent",
      text: "Split automated payments easily.",
      className: "purple-card",
    },

    {
      icon: <FaFileSignature />,
      title: "Digital Lease",
      text: "Secure paperless agreements.",
      className: "orange-card",
    },

    {
      icon: <FaUsers />,
      title: "Social Hub",
      text: "Meet matches before move-in.",
      className: "blue-card",
    },
  ];

  return (

    <section className="modern-living-section">

      <h1>
        Built for Modern Living
      </h1>

      <div className="modern-living-grid">

        {features.map((item, index) => (

          <div
            className={`modern-card ${item.className}`}
            key={index}
          >

            <div className="modern-icon">
              {item.icon}
            </div>

            <h2>
              {item.title}
            </h2>

            <p>
              {item.text}
            </p>

          </div>

        ))}

      </div>

    </section>

  );
}

export default ModernLivingCards;