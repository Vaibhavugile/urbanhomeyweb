import React, { useState } from "react";
import "./SocialSidebar.css";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

// 🔧 REPLACE these with your actual links
const SOCIAL_LINKS = {
  whatsapp: {
    chat: "https://wa.me/919876543210",        // Replace with your WhatsApp number
    profile: "https://wa.me/919876543210",      // WhatsApp doesn't have public pages, chat link used
  },
  instagram: {
    chat: "https://ig.me/m/urbanhomey",         // Replace with your Instagram username
    profile: "https://instagram.com/urbanhomey", // Replace with your Instagram username
  },
  facebook: {
    chat: "https://m.me/urbanhomey",            // Replace with your Facebook page username
    profile: "https://facebook.com/urbanhomey", // Replace with your Facebook page username
  },
};

const socials = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: <FaWhatsapp />,
    color: "#25D366",
    hoverColor: "#1ebe5d",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: <FaInstagram />,
    color: "#E1306C",
    hoverColor: "#c2185b",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: <FaFacebookF />,
    color: "#1877F2",
    hoverColor: "#1565c0",
  },
];

function SocialSidebar() {
  const [activePopup, setActivePopup] = useState(null);

  const togglePopup = (key) => {
    setActivePopup((prev) => (prev === key ? null : key));
  };

  return (
    <div className="social-sidebar">
      {socials.map((s) => (
        <div className="social-item" key={s.key}>

          {/* Popup */}
          {activePopup === s.key && (
            <div className="social-popup">
              <p className="popup-title">{s.label}</p>
              <a
                href={SOCIAL_LINKS[s.key].chat}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-btn chat-btn"
                style={{ backgroundColor: s.color }}
              >
                💬 Send Message
              </a>
              <a
                href={SOCIAL_LINKS[s.key].profile}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-btn profile-btn"
              >
                👤 View Profile
              </a>
            </div>
          )}

          {/* Icon Button */}
          <button
            className="social-btn"
            style={{ backgroundColor: s.color }}
            onClick={() => togglePopup(s.key)}
            aria-label={s.label}
            title={s.label}
          >
            {s.icon}
          </button>

        </div>
      ))}
    </div>
  );
}

export default SocialSidebar;
