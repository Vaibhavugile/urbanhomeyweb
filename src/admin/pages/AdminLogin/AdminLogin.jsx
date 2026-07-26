import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { auth } from "../../../firebase";

import {
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  adminLogin,
} from "./AdminLoginService";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  /* ==========================================
      LOGIN
  ========================================== */

  /* ==========================================
    LOGIN
========================================== */

const handleSubmit = async (e) => {

  e.preventDefault();

  if (!formData.email.trim()) {

    alert("Please enter your email.");

    return;

  }

  if (!formData.password.trim()) {

    alert("Please enter your password.");

    return;

  }

  setIsLoading(true);

  try {

    const session =
      await adminLogin(

        formData.email,

        formData.password

      );

    console.log(
      "Logged In Admin:",
      session
    );

    navigate("/admin");

  }

  catch (error) {

    console.error(error);

    alert(

      error.message ||

      "Invalid email or password."

    );

  }

  finally {

    setIsLoading(false);

  }

};

  /* ==========================================
      FORGOT PASSWORD
  ========================================== */

const handleForgotPassword = async () => {

  if (!formData.email.trim()) {

    alert("Please enter your email first.");

    return;

  }

  try {

    await sendPasswordResetEmail(

      auth,

      formData.email

    );

    alert(
      "Password reset email sent successfully."
    );

  }

  catch (error) {

    console.error(error);

    alert(
      "Unable to send password reset email."
    );

  }

};

  return (

    <div className="login-page">

      <div className="login-card">

        {/* ======================================
              LEFT
        ======================================= */}

        <div className="login-left">

          <div className="logo-badge">

            UrbanHomey

          </div>

          <h1>

            UrbanHomey

            <br />

            <span>

              Admin Portal

            </span>

          </h1>

          <p>

            Securely manage users, listings,
            verifications, reports,
            payments and platform operations
            from one place.

          </p>

          <div className="feature-list">

            <div className="feature-item">

              <div className="feature-icon">

                🛡️

              </div>

              <div>

                <h4>

                  Secure Access

                </h4>

                <span>

                  Restricted administrator login.

                </span>

              </div>

            </div>

            <div className="feature-item">

              <div className="feature-icon">

                👥

              </div>

              <div>

                <h4>

                  User Management

                </h4>

                <span>

                  Manage users, listings and
                  profile approvals.

                </span>

              </div>

            </div>

            <div className="feature-item">

              <div className="feature-icon">

                📊

              </div>

              <div>

                <h4>

                  Platform Monitoring

                </h4>

                <span>

                  Reports, payments and
                  moderation tools.

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ======================================
              RIGHT
        ======================================= */}

        <div className="login-right">

          <div className="login-form-card">

            <h2>

              Admin Login

            </h2>

            <p className="subtitle">

              Sign in to continue to the
              UrbanHomey Admin Panel.

            </p>

            <form onSubmit={handleSubmit}>

              <div className="input-group">

                <label>

                  Email Address

                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter admin email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="password-field">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                {formData.password && (

                  <span
                    className="eye-icon"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >

                    {showPassword
                      ? <FaEye />
                      : <FaEyeSlash />}

                  </span>

                )}

              </div>

              <div className="login-options">

                <span />

                <span
                  className="forgot-password"
                  onClick={
                    handleForgotPassword
                  }
                >

                  Forgot Password?

                </span>

              </div>

              <button
                type="submit"
                className={`login-btn-submit ${
                  isLoading
                    ? "loading"
                    : ""
                }`}
                disabled={isLoading}
              >

                {isLoading ? (

                  <span className="btn-loading-content">

                    <span className="btn-spinner" />

                    Signing In...

                  </span>

                ) : (

                  "Sign In"

                )}

              </button>

              <p className="signup-text">

                Administrator access only.

                <br />

                Contact the Super Admin
                if you need access.

              </p>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminLogin;