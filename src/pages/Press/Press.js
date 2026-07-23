import React from "react";
import "../Press/Press.css";

const pressItems = [
  {
    outlet: "TechCrunch",
    date: "March 2026",
    headline: "UrbanHomey raises ₹42 Cr Series A to expand roommate-matching platform across India",
    url: "#",
  },
  {
    outlet: "The Hindu Business Line",
    date: "January 2026",
    headline: "How UrbanHomey is solving India's urban housing crisis one compatible match at a time",
    url: "#",
  },
  {
    outlet: "YourStory",
    date: "November 2025",
    headline: "Meet the startup making co-living smarter with AI-powered compatibility scores",
    url: "#",
  },
  {
    outlet: "Forbes India",
    date: "August 2025",
    headline: "30 Under 30: UrbanHomey founders on building trust in the shared housing market",
    url: "#",
  },
  {
    outlet: "Economic Times",
    date: "May 2025",
    headline: "UrbanHomey hits 50,000 matches milestone, eyes expansion to Pune and Hyderabad",
    url: "#",
  },
];

function Press() {
  return (
    <div className="info-page">
      <div className="info-hero">
        <span className="info-eyebrow">In the news</span>
        <h1>UrbanHomey in <br /><span className="gradient-text">the press</span></h1>
        <p>For media enquiries, interviews, or assets, reach out to our communications team at <strong>press@urbanhomey.com</strong></p>
      </div>

      <div className="info-content">

        <div className="info-section">
          <div className="info-section-label">Press kit</div>
          <div className="info-section-body">
            <h2>Assets & brand guidelines</h2>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">🎨</div>
                <h3>Brand kit</h3>
                <p>Logos, color palette, and typography guidelines for editorial use.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">📸</div>
                <h3>Product screenshots</h3>
                <p>High-resolution app screenshots and product imagery.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">📄</div>
                <h3>Company fact sheet</h3>
                <p>Key stats, founding story, and leadership bios in one document.</p>
              </div>
            </div>
            <button className="apply-btn" style={{ marginTop: "24px" }}>Download press kit →</button>
          </div>
        </div>

        <div className="info-section">
          <div className="info-section-label">Coverage</div>
          <div className="info-section-body">
            <h2>Recent coverage</h2>
            <div className="roles-list">
              {pressItems.map((item, i) => (
                <div className="role-card" key={i}>
                  <div className="role-info">
                    <div className="role-meta" style={{ marginBottom: "6px" }}>
                      <span className="role-tag">{item.outlet}</span>
                      <span className="role-tag">{item.date}</span>
                    </div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 500 }}>{item.headline}</h3>
                  </div>
                  <a href={item.url} className="apply-btn" style={{ whiteSpace: "nowrap" }}>Read →</a>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Press;
