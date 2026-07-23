import React, { useState } from "react";
import "../Support/Support.css";

const faqs = [
  {
    q: "How does the matching algorithm work?",
    a: "Our algorithm analyses over 40 compatibility signals — sleep schedule, cleanliness habits, social preferences, work hours, and more — to surface matches who are genuinely compatible with your lifestyle, not just available in your price range.",
  },
  {
    q: "Is UrbanHomey free to use?",
    a: "Creating a profile and browsing matches is completely free. A UrbanHomey Plus subscription unlocks unlimited messaging, priority listing, and advanced filters. Plans start at ₹299/month.",
  },
  {
    q: "How do I report a user or listing?",
    a: "Tap the three-dot menu on any profile or listing and select 'Report'. Our Trust & Safety team reviews every report within 24 hours.",
  },
  {
    q: "Can I deactivate my account temporarily?",
    a: "Yes. Go to Settings → Account → Pause profile. Your data is preserved and your profile is hidden from search results until you reactivate.",
  },
  {
    q: "How are profiles verified?",
    a: "We verify government ID, mobile number, and optionally employment or student status. Verified badges appear on profiles so you always know who you're talking to.",
  },
  {
    q: "What cities is UrbanHomey available in?",
    a: "We're currently live in Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai, Kolkata, Ahmedabad, Jaipur, Lucknow, Chandigarh, and Kochi, with more cities launching in 2026.",
  },
];

function Support() {
  const [open, setOpen] = useState(null);

  return (
    <div className="info-page">
      <div className="info-hero">
        <span className="info-eyebrow">Help centre</span>
        <h1>We're here<br /><span className="gradient-text">to help</span></h1>
        <p>Find quick answers below, or reach our support team directly. We aim to respond within 4 hours on business days.</p>
      </div>

      <div className="info-content">

        <div className="info-cards">
          <div className="info-card">
            <div className="info-card-number">&lt;4h</div>
            <div className="info-card-label">Response time</div>
          </div>
          <div className="info-card">
            <div className="info-card-number">24/7</div>
            <div className="info-card-label">Safety reporting</div>
          </div>
          <div className="info-card">
            <div className="info-card-number">98%</div>
            <div className="info-card-label">Issues resolved</div>
          </div>
          <div className="info-card">
            <div className="info-card-number">12</div>
            <div className="info-card-label">Support agents</div>
          </div>
        </div>

        <div className="info-section">
          <div className="info-section-label">Contact</div>
          <div className="info-section-body">
            <h2>Get in touch</h2>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">💬</div>
                <h3>Live chat</h3>
                <p>Available Mon–Sat, 9am–9pm IST. Start a chat from the app or tap the bubble on this page.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">📧</div>
                <h3>Email support</h3>
                <p>Write to us at <strong>support@urbanhomey.com</strong> for non-urgent queries and account issues.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🆘</div>
                <h3>Safety emergencies</h3>
                <p>For urgent safety concerns, use in-app reporting or email <strong>safety@urbanhomey.com</strong> — monitored 24/7.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="info-section-label">FAQs</div>
          <div className="info-section-body">
            <h2>Frequently asked questions</h2>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div className="faq-item" key={i}>
                  <button
                    className={`faq-question ${open === i ? "open" : ""}`}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    {faq.q}
                    <span className="faq-chevron">{open === i ? "▲" : "▼"}</span>
                  </button>
                  {open === i && <div className="faq-answer">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Support;
