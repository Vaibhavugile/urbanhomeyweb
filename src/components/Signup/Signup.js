import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, db } from "../../firebase";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Must include at least 1 uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Must include at least 1 lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Must include at least 1 number");
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Must include 1 special character (!@#$%^&*)");
    }

    return errors;
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }; const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const passwordErrors = validatePassword(formData.password);

    if (passwordErrors.length > 0) {
      alert(passwordErrors.join("\n"));
      return;
    }

    try {
      setIsSigningUp(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        uid: user.uid,
        createdAt: new Date(),
      });

      alert("Account Created Successfully!");

      navigate("/login");

    } catch (error) {
      alert(error.message);
    } finally {
      setTimeout(() => {
        setIsSigningUp(false);
      }, 100); // 1 second disable
    }
  };
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          fullName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          createdAt: new Date(),
        },
        { merge: true }
      );

      navigate("/Dashboard");

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleFacebookSignup = async () => {
    try {
      const provider = new FacebookAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          fullName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          createdAt: new Date(),
        },
        { merge: true }
      );

      navigate("/Dashboard");

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-card">

        {/* LEFT SIDE */}

        <div className="signup-left">

          <div className="brand-content">

            <div className="logo-badge">
              UrbanHomey
            </div>

            <h1>
              Find Your Perfect
              <br />
              <span>Home Match</span>
            </h1>

            <p>
              Connect with compatible roommates,
              discover verified homes and build
              your ideal living experience.
            </p>

            <div className="feature-card">
              <div className="feature-icon">🏠</div>

              <div>
                <h4>Verified Homes</h4>
                <p>
                  Browse quality rental listings
                  verified by our team.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>

              <div>
                <h4>Smart Matching</h4>
                <p>
                  AI-powered roommate compatibility.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>

              <div>
                <h4>Secure Community</h4>
                <p>
                  Safe messaging and verified users.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="signup-right">

          <div className="signup-box">

            <h2>Create Account</h2>

            <p className="subtitle">
              Join UrbanHomey today
            </p>


            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {/* PASSWORD */}

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

              {/* CONFIRM PASSWORD */}

              <div className="password-field">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  required
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
                className="create-btn"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <span className="btn-spinner"></span>
                    Signing Up...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* SOCIAL LOGIN */}
              <div className="divider">
                <span>OR</span>
              </div>
              <div className="social-login">
                <button
                  type="button"
                  className="social-btn google"
                  onClick={handleGoogleSignup}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                    alt="Google"
                  />
                </button>

                <button
                  type="button"
                  className="social-btn facebook"
                  onClick={handleFacebookSignup}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                    alt="Facebook"
                  />
                </button>

                <button
                  type="button"
                  className="social-btn linkedin"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                    alt="LinkedIn"
                  />
                </button>
              </div>



              <p className="login-link">
                Already have an account?

                <span
                  onClick={() =>
                    navigate("/login")
                  }
                >
                  Login
                </span>
              </p>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Signup;