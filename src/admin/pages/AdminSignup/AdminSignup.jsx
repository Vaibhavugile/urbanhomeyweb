import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  createSuperAdmin,
} from "./AdminSignupService";
function AdminSignup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      fullName: "",

      username: "",

      email: "",

      password: "",

      confirmPassword: "",

    });

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  }

  async function handleSubmit(e) {

  e.preventDefault();

  if (!formData.fullName.trim()) {

    alert("Please enter your full name.");

    return;

  }

  if (!formData.username.trim()) {

    alert("Please enter a username.");

    return;

  }

  if (!formData.email.trim()) {

    alert("Please enter your email.");

    return;

  }

  if (!formData.password.trim()) {

    alert("Please enter your password.");

    return;

  }

  if (formData.password.length < 6) {

    alert("Password must be at least 6 characters.");

    return;

  }

  if (
    formData.password !==
    formData.confirmPassword
  ) {

    alert("Passwords do not match.");

    return;

  }

  setIsLoading(true);

  try {

    await createSuperAdmin({

      fullName:
        formData.fullName,

      username:
        formData.username,

      email:
        formData.email,

      password:
        formData.password,

    });

    alert(
      "Super Admin created successfully."
    );

    navigate("/admin/login");

  } catch (error) {

    console.error(error);

    alert(
      error.message ||
      "Unable to create Super Admin."
    );

  } finally {

    setIsLoading(false);

  }

}

  return (

    <div className="login-page">

      <div className="login-card">

        {/* LEFT */}

        <div className="login-left">

          <div className="logo-badge">

            UrbanHomey

          </div>

          <h1>

            Create

            <br />

            <span>

              Super Admin

            </span>

          </h1>

          <p>

            Create the very first administrator
            account for the UrbanHomey platform.

          </p>

          <div className="feature-list">

            <div className="feature-item">

              <div className="feature-icon">
                👑
              </div>

              <div>

                <h4>

                  Super Administrator

                </h4>

                <span>

                  Full access to every module.

                </span>

              </div>

            </div>

            <div className="feature-item">

              <div className="feature-icon">
                🔐
              </div>

              <div>

                <h4>

                  Secure Access

                </h4>

                <span>

                  Firebase Authentication
                  protected.

                </span>

              </div>

            </div>

            <div className="feature-item">

              <div className="feature-icon">
                ⚙️
              </div>

              <div>

                <h4>

                  Role Management

                </h4>

                <span>

                  Manage admins and permissions.

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="login-right">

          <div className="login-form-card">

            <h2>

              Super Admin Signup

            </h2>

            <p className="subtitle">

              This page should only be used once.

            </p>

            <form
              onSubmit={handleSubmit}
            >

              <div className="input-group">

                <label>

                  Full Name

                </label>

                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />

              </div>

              <div className="input-group">

                <label>

                  Username

                </label>

                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />

              </div>

              <div className="input-group">

                <label>

                  Email

                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
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

              <div className="password-field">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />

                {formData.confirmPassword && (

                  <span
                    className="eye-icon"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >

                    {showConfirmPassword
                      ? <FaEye />
                      : <FaEyeSlash />}

                  </span>

                )}

              </div>

              <button
                type="submit"
                className={`login-btn-submit ${
                  isLoading
                    ? "loading"
                    : ""
                }`}
              >

                {isLoading
                  ? "Creating..."
                  : "Create Super Admin"}

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminSignup;