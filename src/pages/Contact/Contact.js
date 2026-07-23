import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">

      {/* Hero */}
      <div className="contact-hero">
        <span className="contact-eyebrow">Get in Touch</span>
        <h1>We'd Love to <span className="highlight">Hear From You</span></h1>
        <p>
          Whether you're looking for your next urban home, have a question about
          listings, or just want to say hello — we're here for you.
        </p>
      </div>

      <div className="contact-body">

        {/* Info Cards */}
        <div className="contact-info">

          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Our Office</h3>
            <p>UrbanHomey HQ<br />Mumbai, Maharashtra<br />India – 400001</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email Us</h3>
            <p>support@urbanhomey.com<br />partnerships@urbanhomey.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Call Us</h3>
            <p>+91 98765 43210<br />Mon – Sat, 9am – 7pm IST</p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>

          {submitted ? (
            <div className="success-msg">
              <span>✅</span>
              <p>Thanks for reaching out! Our team will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="listing">Property Listing Inquiry</option>
                  <option value="roommate">Roommate Matching</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership / Business</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell us how we can help you find your perfect urban space..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message →
              </button>

            </form>
          )}
        </div>

      </div>

      {/* Bottom Banner */}
      <div className="contact-banner">
        <h2>Looking for your perfect urban home?</h2>
        <p>Explore thousands of verified listings across top cities — all in one place.</p>
        <a href="/" className="banner-btn">Explore Listings</a>
      </div>

    </div>
  );
}

export default Contact;
