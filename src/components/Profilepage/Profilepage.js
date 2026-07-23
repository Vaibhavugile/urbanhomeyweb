import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./Profilepage.css";

const DetailItem = ({ label, value }) => (
  <div className="detail-item">
    <span className="detail-label">{label}</span>
    <span className="detail-value">{value || "—"}</span>
  </div>
);

const ListingCard = ({ icon, title, description, colorClass, onClick }) => (
  <div
    className={`listing-card ${colorClass}`}
    onClick={onClick}
    style={{ position: "relative", overflow: "visible" }}
  >
    {/* Badge with fully inline styles — bypasses any CSS conflict */}
    <span
      style={{
        position: "absolute",
        top: "14px",
        right: "14px",
        zIndex: 99,
        padding: "5px 12px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 700,
        whiteSpace: "nowrap",
        background: "rgba(255,255,255,0.9)",
        color: colorClass === "card-purple" ? "#6d28d9" : "#047857",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        pointerEvents: "none",
      }}
    >
      ✓ Active
    </span>

    <div className="listing-card-icon">{icon}</div>
    <h3 className="listing-card-title">{title}</h3>
    <p className="listing-card-desc">{description}</p>

    <div className="listing-card-footer">
      <span className="listing-card-arrow">→</span>
    </div>
  </div>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          navigate("/login");
          return;
        }
        const snap = await getDoc(doc(db, "users", currentUser.uid));
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          ...(snap.exists() ? snap.data() : {}),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="profile-state">Loading...</div>;
  if (!user) return null;

  const initials = user.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.[0]?.toUpperCase() ?? "?";

  const hasDetails =
    user.age || user.gender || user.profession || user.city || user.phone;

  return (
    <div className="profile-page">

      {/* Top Bar */}
      <div className="profile-topbar">
        <button className="profile-back-btn" onClick={() => navigate(-1)} aria-label="Go back">←</button>
        <span className="profile-topbar-title">Profile</span>
        <button className="profile-settings-btn" onClick={() => navigate("/settings")} aria-label="Settings">⚙</button>
      </div>

      {/* Banner */}
      <div className="profile-banner"></div>

      {/* Hero Section */}
      <div className="profile-hero">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar-ring"></div>
          <div className="profile-avatar">{initials}</div>
        </div>

        <h1 className="profile-name">{user.fullName || "Guest User"}</h1>
        <p className="profile-email">{user.email}</p>

        {hasDetails ? (
          <div className="profile-detail-grid">
            <DetailItem label="Age" value={user.age ? `${user.age} yrs` : null} />
            <DetailItem label="Gender" value={user.gender} />
            <DetailItem label="Profession" value={user.profession} />
            <DetailItem label="City" value={user.city} />
            <DetailItem label="Phone" value={user.phone} />
            <DetailItem label="Member Since" value={user.memberSince} />
          </div>
        ) : (
          <p className="profile-incomplete">Complete your profile to get better matches.</p>
        )}

        <button className="profile-edit-btn" onClick={() => navigate("/profile/edit")}>
          ✏️ Edit Profile
        </button>
      </div>

      {/* Listings */}
      <p className="profile-section-title">My Listings</p>

      <div className="profile-cards-grid">
        <ListingCard
          icon="🏢"
          title="Flat Listing"
          description="Manage your property details and preferences."
          colorClass="card-purple"
          onClick={() => navigate("/profile/flat-listing")}
        />
        <ListingCard
          icon="👥"
          title="Flatmate Listing"
          description="Manage your flatmate preferences and lifestyle."
          colorClass="card-teal"
          onClick={() => navigate("/profile/flatmate-listing")}
        />
      </div>

    </div>
  );
};

export default ProfilePage;
