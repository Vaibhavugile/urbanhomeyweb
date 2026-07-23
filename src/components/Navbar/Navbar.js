import React, { useState, useEffect } from "react";
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaBell,
} from "react-icons/fa";

import ProfileImg from "../MatchSection/person1.jpg";

import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) return;

        const docRef = doc(
          db,
          "users",
          currentUser.uid
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="logo">
        <img src="/mainlogo.jpeg" alt="UrbanHomey" className="logo-img" />
      </div>

      {/* SEARCH BAR */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for matches..."
        />
      </div>

      {/* MENU */}
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Discover
        </Link>
        <Link to="/matches" className="nav-link active-link">
          Matches
        </Link>
        <Link to="/messages" className="nav-link">
          Messages
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        <FaBell className="bell-icon" />

        <div className="profile-wrapper">

          <img
            src={ProfileImg}
            alt="profile"
            className="profile-img"
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div className="profile-dropdown">

              <div className="profile-header">
                <img
                  src={ProfileImg}
                  alt="profile"
                  className="dropdown-profile-img"
                />
                <div>
                  <h4>{userData.fullName || "User"}</h4>
                  <p>{userData.email}</p>
                </div>
              </div>

              <button
                className="view-profile-btn"
                onClick={() => {
                  navigate("/profile");
                  setShowProfile(false);
                }}
              >
                View Profile
              </button>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;
