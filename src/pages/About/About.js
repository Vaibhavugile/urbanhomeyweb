import React from "react";
import "../About/About.css";

function About() {
  return (
    <div className="info-page">

      <div className="info-hero">
        <span className="info-eyebrow">About UrbanHomey</span>

        <h1>
          Finding the perfect home across <br />
          <span className="gradient-text">India made simple</span>
        </h1>

        <p>
          UrbanHomey was launched in 2026 with a simple mission:
          helping students, working professionals, and newcomers
          find flats, flatmates, and shared accommodation across India.
          We understand how challenging it can be to find affordable,
          comfortable, and compatible living arrangements when moving
          to a new city. UrbanHomey brings housing and flatmate discovery
          together on one platform.
        </p>
      </div>

      <div className="info-content">

        {/* Mission */}
        <div className="info-section">

          <div className="info-section-label">
            Mission
          </div>

          <div className="info-section-body">

            <h2>Helping India feel like home</h2>

            <p>
              UrbanHomey connects people looking for flats,
              roommates, PGs, and shared accommodation across India.
              Instead of spending hours browsing scattered listings,
              users can discover housing options and compatible
              flatmates in one place. Our goal is to make renting
              simpler, faster, safer, and more transparent for everyone.
            </p>

          </div>

        </div>

        {/* Stats */}
        <div className="info-cards">

          <div className="info-card">
            <div className="info-card-number">5000+</div>
            <div className="info-card-label">
              Housing searches completed
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-number">50+</div>
            <div className="info-card-label">
              Cities covered
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-number">2000+</div>
            <div className="info-card-label">
              Flatmate connections
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-number">2026</div>
            <div className="info-card-label">
              Founded
            </div>
          </div>

        </div>

        {/* Values */}
        <div className="info-section">

          <div className="info-section-label">
            Values
          </div>

          <div className="info-section-body">

            <h2>What drives UrbanHomey</h2>

            <div className="values-grid">

              <div className="value-item">
                <div className="value-icon">🏡</div>

                <h3>Better Housing Access</h3>

                <p>
                  We help people discover affordable and
                  convenient housing options across major cities in India.
                </p>
              </div>

              <div className="value-item">
                <div className="value-icon">🤝</div>

                <h3>Flatmate Compatibility</h3>

                <p>
                  Finding the right roommate is just as important
                  as finding the right apartment. Compatibility
                  creates a better living experience.
                </p>
              </div>

              <div className="value-item">
                <div className="value-icon">🔒</div>

                <h3>Trust & Transparency</h3>

                <p>
                  We focus on providing reliable information
                  and helping users make informed housing decisions.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Locations */}
        <div className="info-section">

          <div className="info-section-label">
            Locations
          </div>

          <div className="info-section-body">

            <h2>Serving major cities across India</h2>

            <p>
              UrbanHomey helps users discover housing and
              flatmate opportunities in cities including
              Mumbai, Pune, Bengaluru, Hyderabad, Chennai,
              Delhi, Kolkata, Ahmedabad, Jaipur, Lucknow,
              Kochi, Chandigarh, Indore, Nagpur, Surat,
              and many more growing urban destinations.
            </p>

          </div>

        </div>

        {/* Team */}
        <div className="info-section">

          <div className="info-section-label">
            Team
          </div>

          <div className="info-section-body">

            <h2>Built by people who understand renting</h2>

            <p>
              UrbanHomey is developed by a passionate team
              focused on solving housing challenges for students,
              job seekers, working professionals, and families
              relocating across India. Our mission is to create a
              trusted platform that makes finding flats and flatmates
              easier, faster, and more reliable.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default About;