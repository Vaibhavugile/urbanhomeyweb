import React from "react";
import "../Terms/Terms.css";

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      {
        subtitle: "Agreement to these terms",
        text: "By creating an UrbanHomey account, accessing, or using our website or mobile application, you agree to these Terms & Conditions and our Privacy Policy. If you do not agree with these terms, please do not use UrbanHomey.",
      },
      {
        subtitle: "Changes to these terms",
        text: "We may update these Terms from time to time to reflect changes to our services or legal requirements. When material changes are made, we will notify users through the app, our website, or other appropriate methods. Continued use of UrbanHomey after the updated Terms become effective constitutes acceptance of the revised Terms.",
      },
    ],
  },

  {
    title: "Eligibility",
    content: [
      {
        subtitle: "Age requirement",
        text: "UrbanHomey is intended only for individuals who are 18 years of age or older. By creating an account, you confirm that you satisfy this requirement.",
      },
      {
        subtitle: "Account responsibility",
        text: "You are responsible for maintaining the security of your account and for all activities performed using your account. You must provide accurate information during registration and keep your profile up to date.",
      },
      {
        subtitle: "Identity verification",
        text: "Certain features may require identity verification. Providing false, misleading, or fraudulent information may result in suspension or permanent removal of your account.",
      },
    ],
  },

  {
    title: "Use of the Platform",
    content: [
      {
        subtitle: "Purpose of UrbanHomey",
        text: "UrbanHomey helps users discover compatible flatmates, roommates, rental listings, and shared accommodation opportunities. The platform must only be used for lawful housing-related purposes.",
      },
      {
        subtitle: "Acceptable use",
        text: "You agree to use UrbanHomey respectfully and in compliance with all applicable laws. You must not misuse the platform or interfere with its normal operation.",
      },
      {
        subtitle: "Prohibited activities",
        text: "You must not upload fake listings, impersonate another person, spread misinformation, send spam, attempt scams, collect other users' personal information without permission, distribute malware, or engage in illegal activities through UrbanHomey.",
      },
      {
        subtitle: "User generated content",
        text: "You are responsible for all profile information, photos, listings, messages, and other content you publish. You must ensure that your content is accurate, lawful, and does not violate the rights of others.",
      },
    ],
  },

  {
  title: "Community Safety & User Conduct",
  content: [
    {
      subtitle: "Zero tolerance policy",
      text: "UrbanHomey maintains zero tolerance for objectionable content, harassment, bullying, hate speech, discrimination, sexually explicit content, threats, scams, fake profiles, fraudulent listings, and abusive behaviour. Accounts violating these standards may be suspended or permanently removed.",
    },
    {
      subtitle: "Reporting inappropriate content",
      text: "Users can report inappropriate profiles, listings, messages, or behaviour directly within the UrbanHomey app. Reports are reviewed by our moderation team, and appropriate action may be taken, including content removal or account suspension.",
    },
    {
      subtitle: "Blocking users",
      text: "Users may block other users at any time within the application. Blocking prevents further interaction between users where supported by the platform and helps maintain a safe and respectful experience.",
    },
    {
      subtitle: "Moderation",
      text: "UrbanHomey reserves the right to investigate reports, remove objectionable content, restrict platform access, or permanently terminate accounts that violate these Terms, our Community Standards, or applicable laws.",
    },
  ],
},


  {
    title: "Listings & Matches",
    content: [
      {
        subtitle: "Listing accuracy",
        text: "All property listings, room advertisements, and profile information must accurately represent the accommodation being offered. Fake, misleading, duplicate, or unavailable listings are prohibited.",
      },
      {
        subtitle: "Compatibility matches",
        text: "UrbanHomey's matching system is designed to improve compatibility between users based on profile information and preferences. However, we cannot guarantee successful matches or living arrangements.",
      },
      {
        subtitle: "Independent agreements",
        text: "Any rental agreement, payment, tenancy arrangement, or contract entered into between users is solely between those users. UrbanHomey is not a party to such agreements and is not responsible for disputes arising from them.",
      },
    ],
  },
    {
    title: "Payments & Subscriptions",
    content: [
      {
        subtitle: "Free features",
        text: "Creating an account, completing your profile, browsing listings, and exploring compatible matches may be available free of charge. Some premium features require an active UrbanHomey Plus subscription or eligible in-app purchase.",
      },
      {
        subtitle: "Subscriptions & billing",
        text: "Premium subscriptions purchased through the Apple App Store or Google Play are billed through the respective platform. Subscription prices, billing periods, renewal terms, and taxes are displayed before purchase.",
      },
      {
        subtitle: "Auto-renewal",
        text: "Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current billing period. Subscription management and cancellation can be completed through your Apple App Store or Google Play account settings.",
      },
      {
        subtitle: "Refunds",
        text: "Refunds are handled according to the policies of the platform through which the purchase was made. UrbanHomey cannot issue refunds for purchases processed by Apple or Google unless permitted under their respective policies or applicable law.",
      },
    ],
  },

  {
    title: "Intellectual Property",
    content: [
      {
        subtitle: "UrbanHomey ownership",
        text: "UrbanHomey, including its name, logo, branding, software, design, matching system, graphics, and related intellectual property, is owned by UrbanHomey or its licensors and is protected under applicable intellectual property laws.",
      },
      {
        subtitle: "Your content",
        text: "You retain ownership of the content you upload. By submitting content to UrbanHomey, you grant us a limited, non-exclusive licence to display, process, store, and use that content solely for operating, maintaining, securing, and improving our services.",
      },
    ],
  },

  {
    title: "Disclaimers & Limitation of Liability",
    content: [
      {
        subtitle: "Platform availability",
        text: "UrbanHomey is provided on an 'as available' and 'as is' basis. While we strive to maintain reliable service, we cannot guarantee uninterrupted availability, error-free operation, or compatibility with every device or network.",
      },
      {
        subtitle: "No guarantee",
        text: "UrbanHomey does not guarantee that users will successfully find accommodation, roommates, tenants, landlords, or compatible flatmates. Compatibility suggestions are informational only and should not replace your own judgement.",
      },
      {
        subtitle: "User responsibility",
        text: "Users are solely responsible for verifying the identity, background, property details, rental agreements, and financial arrangements of other users before entering into any agreement or meeting in person.",
      },
      {
        subtitle: "Limitation of liability",
        text: "To the maximum extent permitted by applicable law, UrbanHomey shall not be liable for any indirect, incidental, consequential, or special damages arising from your use of the platform or interactions with other users.",
      },
    ],
  },

  {
    title: "Account Suspension & Termination",
    content: [
      {
        subtitle: "Deleting your account",
        text: "You may permanently delete your UrbanHomey account at any time using the 'Request Account Deletion' option available within the application. Once processed, your account and associated profile information will be removed in accordance with our Privacy Policy.",
      },
      {
        subtitle: "Suspension or termination",
        text: "UrbanHomey may suspend, restrict, or permanently terminate accounts that violate these Terms, engage in fraudulent behaviour, misuse the platform, repeatedly receive valid abuse reports, or otherwise compromise the safety or integrity of the community.",
      },
      {
        subtitle: "Effect of termination",
        text: "Upon account termination, access to UrbanHomey services may be revoked immediately. Certain information may be retained where required by law, for fraud prevention, dispute resolution, or enforcement of these Terms.",
      },
    ],
  },

  {
    title: "Privacy",
    content: [
      {
        subtitle: "Personal information",
        text: "Your privacy is important to us. Our collection, storage, processing, and protection of personal information is governed by our Privacy Policy, which forms part of these Terms.",
      },
      {
        subtitle: "Security",
        text: "While we implement reasonable technical and organisational safeguards to protect your information, no online platform can guarantee absolute security. Users are responsible for protecting their own account credentials.",
      },
    ],
  },

  {
    title: "Governing Law",
    content: [
      {
        subtitle: "Applicable law",
        text: "These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from these Terms or your use of UrbanHomey shall be subject to the exclusive jurisdiction of the competent courts located in Pune, Maharashtra, India.",
      },
    ],
  },
  {
  subtitle: "Community safety",
  text: "Information provided through reports, account verification, and moderation activities may be processed to investigate abuse, enforce our Terms & Conditions, protect users, and maintain the safety of the UrbanHomey community.",
},
];
function Terms() {
  return (
    <div className="info-page">
      <div className="info-hero">
        <span className="info-eyebrow">
          UrbanHomey Terms & Conditions
        </span>

        <h1>
          Safe Living,
          <br />
          <span className="gradient-text">
            Trusted Community
          </span>
        </h1>

        <p>
          These Terms & Conditions govern your use of UrbanHomey,
          including our website, mobile application, and related
          services. By using UrbanHomey, you agree to follow these
          Terms and help us maintain a safe, respectful, and trusted
          community for everyone.
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
              18+
            </div>
            <div className="info-card-label">
              Minimum Age
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-number">
              ✓
            </div>
            <div className="info-card-label">
              Verified Community
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-number">
              🛡
            </div>
            <div className="info-card-label">
              Report & Block
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-number">
              🇮🇳
            </div>
            <div className="info-card-label">
              Governed by Indian Law
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
              Questions about these Terms?
            </h2>

            <p>
              If you have questions regarding these Terms &
              Conditions, account safety, subscriptions, or legal
              matters, please contact us.
            </p>

            <br />

            <p>
              📧 <strong>legal@urbanhomey.com</strong>
            </p>

            <p>
              📧 <strong>support@urbanhomey.com</strong>
            </p>

            <br />

            <p>
              We normally respond to legal and support enquiries
              within <strong>3–5 business days.</strong>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Terms;
