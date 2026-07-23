import React from "react";
import "../Privacy/Privacy.css";

const sections = [
  {
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information you provide",
        text: "When you create an UrbanHomey account, we collect information you choose to provide, including your name, mobile number, profile photo, age, gender, city, occupation, lifestyle preferences, biography, flat or room details, and any other information you voluntarily add to your profile.",
      },
      {
        subtitle: "Identity verification",
        text: "If you choose to verify your identity, we may collect verification documents or information required to confirm your identity. Verification information is used solely to improve trust and safety within the UrbanHomey community.",
      },
      {
        subtitle: "Messages and user content",
        text: "We collect the content you create while using UrbanHomey, including chat messages, listings, flatmate preferences, profile information, uploaded photos, reports submitted to our moderation team, and feedback you choose to provide.",
      },
      {
        subtitle: "Automatically collected information",
        text: "We automatically collect certain technical information such as device type, operating system, application version, IP address, approximate location, crash reports, usage analytics, and notification preferences to improve platform performance and security.",
      },
    ],
  },

  {
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Providing UrbanHomey services",
        text: "We use your information to create your account, authenticate your login, build your profile, display your listings, recommend compatible flatmates, and provide messaging, matching, and other platform features.",
      },
      {
        subtitle: "Improving compatibility",
        text: "Your preferences and profile information help us generate compatibility scores, improve recommendations, personalise search results, and provide a better matching experience.",
      },
      {
        subtitle: "Community safety",
        text: "We use account information, reports, verification data, and moderation tools to detect fraud, prevent abuse, investigate inappropriate behaviour, enforce our Terms & Conditions, and maintain a safe community.",
      },
      {
        subtitle: "Communication",
        text: "We may send login verification codes, important account notifications, security alerts, subscription updates, support responses, and service-related announcements. Marketing communications are only sent where permitted and can be managed through your preferences.",
      },
    ],
  },

  {
    title: "How We Share Your Information",
    content: [
      {
        subtitle: "With other UrbanHomey users",
        text: "Information included in your public profile, such as your name, profile photo, age, city, lifestyle preferences, biography, listings, and compatibility information, may be visible to other users as part of the matching experience. Your private contact information is not shared publicly unless you choose to do so.",
      },
      {
        subtitle: "With trusted service providers",
        text: "We work with trusted technology providers that help us operate UrbanHomey, including cloud hosting, authentication, notifications, analytics, payment processing, customer support, and security monitoring. These providers only receive the information necessary to perform their services on our behalf.",
      },
      {
        subtitle: "Legal requirements",
        text: "We may disclose information where required by applicable law, legal process, court order, or to protect the rights, safety, property, or security of UrbanHomey, our users, or the public.",
      },
      {
        subtitle: "We never sell your personal information",
        text: "UrbanHomey does not sell, rent, or trade your personal information to advertisers, data brokers, or other third parties for marketing purposes.",
      },
    ],
  },
    {
    title: "Data Storage & Security",
    content: [
      {
        subtitle: "Secure data storage",
        text: "UrbanHomey stores user information using secure cloud infrastructure with industry-standard security practices. We take reasonable technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.",
      },
      {
        subtitle: "Account security",
        text: "Authentication is protected using secure verification methods. Users are responsible for keeping their devices secure and must not share verification codes or account access with anyone.",
      },
      {
        subtitle: "Data retention",
        text: "We retain your information only for as long as it is necessary to provide our services, comply with legal obligations, resolve disputes, enforce our policies, and maintain platform security.",
      },
      {
        subtitle: "Account deletion",
        text: "You may request deletion of your account directly from within the UrbanHomey application. Once your deletion request is processed, your profile, listings, flatmate preferences, and other associated personal information will be permanently removed, except where retention is required by law or for fraud prevention purposes.",
      },
    ],
  },

  {
    title: "Your Privacy Rights",
    content: [
      {
        subtitle: "Access and updates",
        text: "You may review and update your profile information at any time through your account settings to ensure your information remains accurate and up to date.",
      },
      {
        subtitle: "Account deletion",
        text: "You may permanently delete your UrbanHomey account using the Request Account Deletion option available within the application. Once completed, your access to UrbanHomey will end and your personal information will be removed in accordance with this Privacy Policy.",
      },
      {
        subtitle: "Communication preferences",
        text: "You may manage notification preferences and certain communication settings within the application. Essential service-related notifications may still be sent when required for account security or platform operation.",
      },
      {
        subtitle: "Support requests",
        text: "If you have questions regarding your personal information or privacy rights, you may contact our support team using the contact information provided below.",
      },
    ],
  },

  {
    title: "Cookies & Similar Technologies",
    content: [
      {
        subtitle: "Website technologies",
        text: "When using the UrbanHomey website, we may use cookies or similar technologies to remember preferences, improve website functionality, analyse usage, and enhance the overall user experience.",
      },
      {
        subtitle: "Application technologies",
        text: "Within the UrbanHomey mobile application, we may use device identifiers, secure local storage, and analytics technologies to improve reliability, performance, notifications, and application security.",
      },
    ],
  },

  {
    title: "Children's Privacy",
    content: [
      {
        subtitle: "18+ platform",
        text: "UrbanHomey is intended only for individuals who are 18 years of age or older. We do not knowingly collect personal information from children. Accounts found to belong to individuals under 18 may be removed without prior notice.",
      },
    ],
  },

  {
    title: "Updates to this Privacy Policy",
    content: [
      {
        subtitle: "Policy changes",
        text: "We may update this Privacy Policy from time to time to reflect changes in our services, legal obligations, or security practices. When significant changes are made, we will provide notice through the application, our website, or other appropriate communication channels before the updated policy becomes effective.",
      },
    ],
  },
  
];
function Privacy() {
  return (
    <div className="info-page">
      <div className="info-hero">
        <span className="info-eyebrow">
          UrbanHomey Privacy Policy
        </span>

        <h1>
          Your Privacy,
          <br />
          <span className="gradient-text">
            Our Commitment
          </span>
        </h1>

        <p>
          Your privacy matters to us. This Privacy Policy explains
          what information UrbanHomey collects, how we use it, how we
          protect it, and the choices you have regarding your personal
          information while using our website and mobile application.
        </p>

        <p
          style={{
            marginTop: "12px",
            fontSize: "0.85rem",
            color: "#94a3b8",
          }}
        >
          Last Updated: July 2026 • Effective: July 2026
        </p>
      </div>

      <div className="info-content">

        <div className="info-cards">

          <div className="info-card">
            <div className="info-card-number">
              🔒
            </div>
            <div className="info-card-label">
              Privacy First
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-number">
              🛡
            </div>
            <div className="info-card-label">
              Secure Platform
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-number">
              ✓
            </div>
            <div className="info-card-label">
              User Control
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-number">
              🇮🇳
            </div>
            <div className="info-card-label">
              Trusted Service
            </div>
          </div>

        </div>

        {sections.map((section, index) => (
          <div
            className="info-section"
            key={index}
          >
            <div className="info-section-label">
              {String(index + 1).padStart(
                2,
                "0"
              )}
            </div>

            <div className="info-section-body">
              <h2>{section.title}</h2>

              <div className="policy-items">
                {section.content.map(
                  (item, itemIndex) => (
                    <div
                      className="policy-item"
                      key={itemIndex}
                    >
                      <h3>{item.subtitle}</h3>

                      <p>{item.text}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="info-section">
          <div className="info-section-label">
            Contact
          </div>

          <div className="info-section-body">

            <h2>
              Questions about your privacy?
            </h2>

            <p>
              If you have questions regarding this Privacy Policy,
              your personal information, account deletion, or your
              privacy rights, please contact us.
            </p>

            <br />

            <p>
              📧 <strong>privacy@urbanhomey.com</strong>
            </p>

            <p>
              📧 <strong>support@urbanhomey.com</strong>
            </p>

            <br />

            <p>
              We aim to respond to privacy-related enquiries within
              <strong> 72 hours</strong>.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Privacy;
