import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, db } from "../../firebase";

import {
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* LOGIN */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!formData.password.trim()) {
      alert("Please enter your password");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // ✅ Update lastLogin timestamp
      await updateDoc(doc(db, "users", user.uid), {
        lastLogin: serverTimestamp(),
      });

      // ✅ Fetch the full user profile from Firestore
      const userDocSnap = await getDoc(doc(db, "users", user.uid));

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        // ✅ Save to localStorage so ProfilePage can read it
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            uid:         user.uid,
            name:        userData.name        || userData.fullName || "",
            email:       user.email,
            age:         userData.age         || "",
            profession:  userData.profession  || "",
            city:        userData.city        || "",
            phone:       userData.phone       || user.phoneNumber || "",
            gender:      userData.gender      || "",
            memberSince: userData.createdAt
              ? new Date(userData.createdAt.seconds * 100).toLocaleDateString(
                  "en-US",
                  { month: "short", year: "numeric" }
                )
              : "",
          })
        );
      }

      // Wait at least 2 seconds before navigating
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/Dashboard");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert("Invalid email or password");
    }
  };

  /* FORGOT PASSWORD */
  const handleForgotPassword = async () => {
    if (!formData.email.trim()) {
      alert("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      alert("Password reset link has been sent to your email.");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        alert("No account found with this email");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email address");
      } else {
        alert("Failed to send reset email. Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* LEFT SIDE */}
        <div className="login-left">
          <div className="logo-badge">UrbanHomey</div>

          <h1>
            Find Your Perfect
            <br />
            <span> Home Match</span>
          </h1>

          <p>
            Connect with compatible roommates, discover verified rental homes,
            and enjoy a smarter living experience.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">🏠</div>
              <div>
                <h4>Verified Homes</h4>
                <span>Browse trusted rental properties.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <div>
                <h4>Smart Matching</h4>
                <span>Find compatible roommates easily.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <div>
                <h4>Safe Community</h4>
                <span>Verified users and secure chats.</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <div className="login-form-card">
            <h2>Welcome Back</h2>
            <p className="subtitle">Sign in to continue to UrbanHomey</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {formData.password && (
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                )}
              </div>

              <div className="login-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  Remember me
                </label>

                <span className="forgot-password" onClick={handleForgotPassword}>
                  Forgot Password?
                </span>
              </div>

              <button
                type="submit"
                className={`login-btn-submit ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="btn-loading-content">
                    <span className="btn-spinner"></span>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              <p className="signup-text">
                Don't have an account?
                <span onClick={() => navigate("/signup")}>Sign Up</span>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
