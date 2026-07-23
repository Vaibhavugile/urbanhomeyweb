import React,{
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import {
    getFlatmateProfileById,
    deleteFlatmateProfile,
} from "./FlatmateDetailsService";

import "./FlatmateDetails.css";

function FlatmateDetails(){

   const { uid, profileId } =
    useParams();

const navigate = useNavigate();

    const [profile,setProfile] =
        useState(null);

    const [loading,setLoading] =
        useState(true);

    useEffect(()=>{

        loadProfile();

   }, [uid, profileId]);

    async function loadProfile(){

        setLoading(true);

        const data =
    await getFlatmateProfileById(
        uid,
        profileId
    );

        setProfile(data);

        setLoading(false);

    }

    if(loading){

        return(

            <PageLayout title="Loading">

                Loading Profile...

            </PageLayout>

        );

    }

    if(!profile){

        return(

            <PageLayout title="Flatmate">

                Profile Not Found

            </PageLayout>

        );

    }

    return(

        <PageLayout
            title="Flatmate Profile"
            subtitle="Manage flatmate profile"
        >

            <div className="flatmate-details-page">

                {/* ==========================================
    HERO
========================================== */}

{/* ==========================================================
    PROFILE HERO
========================================================== */}

<div className="profilehero">

  {/* LEFT */}

  <div className="profilehero-gallery">

    <div className="profilehero-main-image">

      <img
        src={
          profile.userProfile?.profilePhotoUrl ||
          "https://placehold.co/700x700"
        }
        alt={profile.userProfile?.name}
      />

    </div>

  </div>

  {/* RIGHT */}

  <div className="profilehero-content">

    <div className="profilehero-header">

      <span className="profilehero-type">

        👤 Seeking Flatmate

      </span>

      <span
        className={
          profile.userProfile?.isVerified
            ? "profilehero-status verified"
            : "profilehero-status pending"
        }
      >
        {profile.userProfile?.isVerified
          ? "✅ Verified"
          : "❌ Not Verified"}
      </span>

    </div>

    <h1 className="profilehero-name">

      {profile.userProfile?.name || "-"}

    </h1>

    <div className="profilehero-budget">

      <span className="budget-min">

        ₹
        {(profile.budgetMin ?? 0).toLocaleString("en-IN")}

      </span>

      <span className="budget-separator">

        -

      </span>

      <span className="budget-max">

        ₹
        {(profile.budgetMax ?? 0).toLocaleString("en-IN")}

      </span>

    </div>

    <div className="profilehero-location">

      📍 {profile.locationName || "-"}

    </div>

    {/* BADGES */}

    <div className="profilehero-badges">

      <span>👤 {profile.userProfile?.gender}</span>

      <span>🎂 {profile.userProfile?.age} Years</span>

      <span>💼 {profile.userProfile?.occupation}</span>

      <span>🛐 {profile.userProfile?.religion}</span>

      <span>

        📅

        {profile.moveInDate?.toDate
          ? profile.moveInDate
              .toDate()
              .toLocaleDateString("en-IN")
          : "-"}

      </span>

    </div>

    {/* INFO GRID */}

    <div className="profilehero-grid">

      <div className="profilehero-box">

        <label>

          Preferred Flat

        </label>

        <strong>

          {profile.flatRequirements?.preferredFlatType || "-"}

        </strong>

      </div>

      <div className="profilehero-box">

        <label>

          Room Type

        </label>

        <strong>

          {profile.flatRequirements?.preferredRoomType || "-"}

        </strong>

      </div>

      <div className="profilehero-box">

        <label>

          Furnished

        </label>

        <strong>

          {profile.flatRequirements?.preferredFurnishedStatus || "-"}

        </strong>

      </div>

      <div className="profilehero-box">

        <label>

          Looking For

        </label>

        <strong>

          {profile.flatmatePreferences?.preferredFlatmateGender || "-"}

        </strong>

      </div>

    </div>

    {/* ACTIONS */}

    <div className="profilehero-actions">

      <button className="primary-btn">

        ✏️ Edit Profile

      </button>

      <button
        className="secondary-btn"
        onClick={() =>
          window.open(
            `https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`,
            "_blank"
          )
        }
      >

        📍 View Location

      </button>

    </div>

  </div>

</div>
{/* ==========================================
    PERSONAL INFORMATION
========================================== */}

<div className="details-section">

  <div className="section-title">
    👤 Personal Information
  </div>

  <div className="details-card">

    <div className="property-grid">

      <div className="property-item">
        <label>Full Name</label>
        <strong>
          {profile.userProfile?.name || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Phone Number</label>
        <strong>
          {profile.userProfile?.phoneNumber || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Gender</label>
        <strong>
          {profile.userProfile?.gender || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Age</label>
        <strong>
          {profile.userProfile?.age || "-"} Years
        </strong>
      </div>

      <div className="property-item">
        <label>Occupation</label>
        <strong>
          {profile.userProfile?.occupation || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Religion</label>
        <strong>
          {profile.userProfile?.religion || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Current City</label>
        <strong>
          {profile.userProfile?.city || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>User Type</label>
        <strong>
          {profile.userType || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Verification</label>

        <strong
          className={
            profile.userProfile?.isVerified
              ? "verified-text"
              : "pending-text"
          }
        >
          {profile.userProfile?.isVerified
            ? "Verified"
            : "Not Verified"}
        </strong>
      </div>

      <div className="property-item">
        <label>Verification Status</label>

        <strong>
          {profile.userProfile?.verification
            ?.verificationStatus || "-"}
        </strong>
      </div>

      <div className="property-item full-width">
        <label>User UID</label>

        <strong>
          {profile.uid || "-"}
        </strong>
      </div>

    </div>

  </div>

</div>
{/* ==========================================
    BUDGET & MOVE IN
========================================== */}

<div className="details-section">

  <div className="section-title">
    💰 Budget & Move-In Preferences
  </div>

  <div className="details-card">

    <div className="property-grid">

      <div className="property-item">

        <label>Minimum Budget</label>

        <strong>
          ₹ {(profile.budgetMin ?? 0).toLocaleString("en-IN")}
        </strong>

      </div>

      <div className="property-item">

        <label>Maximum Budget</label>

        <strong>
          ₹ {(profile.budgetMax ?? 0).toLocaleString("en-IN")}
        </strong>

      </div>

      <div className="property-item">

        <label>Move In Date</label>

        <strong>
          {profile.moveInDate?.toDate
            ? profile.moveInDate
                .toDate()
                .toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
            : "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>Preferred City</label>

        <strong>
          {profile.city || "-"}
        </strong>

      </div>

      <div className="property-item full-width">

        <label>Preferred Location</label>

        <strong>
          {profile.locationName || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>Latitude</label>

        <strong>
          {profile.latitude ?? "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>Longitude</label>

        <strong>
          {profile.longitude ?? "-"}
        </strong>

      </div>

      <div className="property-item full-width">

        <label>Google Place ID</label>

        <strong>
          {profile.placeId || "-"}
        </strong>

      </div>

    </div>

    {profile.latitude && profile.longitude && (

      <div
        style={{
          marginTop: 24,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
        }}
      >

        <button
          className="primary-btn"
          onClick={() =>
            window.open(
              `https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`,
              "_blank"
            )
          }
        >
          📍 Open in Google Maps
        </button>

        <button
          className="secondary-btn"
          onClick={() => {
            navigator.clipboard.writeText(
              profile.locationName || ""
            );
            alert("Location copied.");
          }}
        >
          📋 Copy Address
        </button>

      </div>

    )}

  </div>

</div>
{/* ==========================================
    PREFERRED FLAT REQUIREMENTS
========================================== */}

<div className="details-section">

  <div className="section-title">
    🏠 Preferred Flat Requirements
  </div>

  <div className="details-card">

    <div className="property-grid">

      <div className="property-item">

        <label>Preferred Flat Type</label>

        <strong>
          {profile.flatRequirements?.preferredFlatType || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>Preferred Room Type</label>

        <strong>
          {profile.flatRequirements?.preferredRoomType || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>Preferred Furnished Status</label>

        <strong>
          {profile.flatRequirements?.preferredFurnishedStatus || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>Total Amenities</label>

        <strong>
          {profile.flatRequirements?.amenitiesDesired?.length || 0}
        </strong>

      </div>

    </div>

    <div style={{ marginTop: 28 }}>

      <h3 className="sub-section-title">
        🏡 Amenities Wanted
      </h3>

      <div className="chip-container">

        {profile.flatRequirements?.amenitiesDesired?.length ? (

          profile.flatRequirements.amenitiesDesired.map((item) => (

            <span
              key={item}
              className="chip purple"
            >
              {item}
            </span>

          ))

        ) : (

          <span className="empty-text">
            No amenities selected.
          </span>

        )}

      </div>

    </div>

  </div>

</div>
{/* ==========================================
    PREFERRED FLATMATE
========================================== */}

<div className="details-section">

  <div className="section-title">
    👥 Preferred Flatmate
  </div>

  <div className="details-card">

    <div className="property-grid">

      <div className="property-item">

        <label>Preferred Gender</label>

        <strong>
          {profile.flatmatePreferences?.preferredFlatmateGender || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>Preferred Age</label>

        <strong>
          {profile.flatmatePreferences?.preferredFlatmateAge || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>Preferred Occupation</label>

        <strong>
          {profile.flatmatePreferences?.preferredOccupation || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>Preferred Habits</label>

        <strong>
          {profile.flatmatePreferences?.preferredHabits?.length || 0} Selected
        </strong>

      </div>

      <div className="property-item">

        <label>Ideal Qualities</label>

        <strong>
          {profile.flatmatePreferences?.idealQualities?.length || 0} Selected
        </strong>

      </div>

      <div className="property-item">

        <label>Deal Breakers</label>

        <strong>
          {profile.flatmatePreferences?.dealBreakers?.length || 0} Selected
        </strong>

      </div>

    </div>

    {/* Preferred Habits */}

    <div style={{ marginTop: 30 }}>

      <h3 className="sub-section-title">

        🌿 Preferred Habits

      </h3>

      <div className="chip-container">

        {profile.flatmatePreferences?.preferredHabits?.length ? (

          profile.flatmatePreferences.preferredHabits.map((item) => (

            <span
              key={item}
              className="chip purple"
            >
              {item}
            </span>

          ))

        ) : (

          <span className="empty-text">

            No preferred habits added.

          </span>

        )}

      </div>

    </div>

    {/* Ideal Qualities */}

    <div style={{ marginTop: 30 }}>

      <h3 className="sub-section-title">

        ⭐ Ideal Qualities

      </h3>

      <div className="chip-container">

        {profile.flatmatePreferences?.idealQualities?.length ? (

          profile.flatmatePreferences.idealQualities.map((item) => (

            <span
              key={item}
              className="chip green"
            >
              {item}
            </span>

          ))

        ) : (

          <span className="empty-text">

            No ideal qualities added.

          </span>

        )}

      </div>

    </div>

    {/* Deal Breakers */}

    <div style={{ marginTop: 30 }}>

      <h3 className="sub-section-title">

        🚫 Deal Breakers

      </h3>

      <div className="chip-container">

        {profile.flatmatePreferences?.dealBreakers?.length ? (

          profile.flatmatePreferences.dealBreakers.map((item) => (

            <span
              key={item}
              className="chip red"
            >
              {item}
            </span>

          ))

        ) : (

          <span className="empty-text">

            No deal breakers added.

          </span>

        )}

      </div>

    </div>

  </div>

</div>
{/* ==========================================
    LIFESTYLE & HABITS
========================================== */}

<div className="details-section">

  <div className="section-title">
    🌿 Lifestyle & Habits
  </div>

  <div className="details-card">

    <div className="property-grid">

      <div className="property-item">

        <label>🍽 Food Preference</label>

        <strong>
          {profile.userProfile?.habits?.food || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>🚭 Smoking</label>

        <strong>
          {profile.userProfile?.habits?.smoking || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>🍷 Drinking</label>

        <strong>
          {profile.userProfile?.habits?.drinking || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>🧹 Cleanliness</label>

        <strong>
          {profile.userProfile?.habits?.cleanliness || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>🐶 Pet Ownership</label>

        <strong>
          {profile.userProfile?.habits?.petOwnership || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>🐾 Pet Tolerance</label>

        <strong>
          {profile.userProfile?.habits?.petTolerance || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>🎉 Guests Frequency</label>

        <strong>
          {profile.userProfile?.habits?.guestsFrequency || "-"}
        </strong>

      </div>

      <div className="property-item">

        <label>🤝 Social Preference</label>

        <strong>
          {profile.userProfile?.habits?.socialPreferences || "-"}
        </strong>

      </div>

    </div>

  </div>

</div>

{/* ==========================================
    LOCATION & ACTIVITY
========================================== */}

<div className="details-section">

  
  {/* ACTIVITY */}

  <div className="details-card">

    <h3 className="sub-section-title">
      📊 Profile Activity
    </h3>

    <div className="property-grid">

      <div className="property-item">

        <label>Created On</label>

        <strong>

          {profile.createdAt?.toDate
            ? profile.createdAt
                .toDate()
                .toLocaleString("en-IN")
            : "-"}

        </strong>

      </div>

      <div className="property-item">

        <label>Last Updated</label>

        <strong>

          {profile.lastUpdated?.toDate
            ? profile.lastUpdated
                .toDate()
                .toLocaleString("en-IN")
            : "-"}

        </strong>

      </div>

      <div className="property-item">

        <label>User UID</label>

        <strong>

          {profile.uid || "-"}

        </strong>

      </div>

      <div className="property-item">

        <label>Firestore Document ID</label>

        <strong>

          {profile.documentId || "-"}

        </strong>

      </div>

      <div className="property-item">

        <label>User Type</label>

        <strong>

          {profile.userType || "-"}

        </strong>

      </div>

      <div className="property-item">

        <label>Verification Status</label>

        <strong>

          {profile.userProfile?.verification?.verificationStatus ||
            "Not Verified"}

        </strong>

      </div>

    </div>

  </div>

</div>
{/* ==========================================
    ADMIN CONTROL CENTER
========================================== */}

<div className="details-section">

  <div className="section-title">
    🛠 Admin Control Center
  </div>

  <div className="admin-actions-grid">

    <button
      className="admin-btn purple"
      onClick={() =>
        console.log("Edit Profile", profile)
      }
    >
      ✏️
      <span>Edit Profile</span>
    </button>

    <button
      className="admin-btn blue"
      onClick={() =>
        console.log("View User", profile.uid)
      }
    >
      👤
      <span>View User</span>
    </button>

    <button
      className="admin-btn green"
      onClick={() =>
        console.log("Verify User")
      }
    >
      ✅
      <span>Verify User</span>
    </button>

    <button
      className="admin-btn orange"
      onClick={() =>
        console.log("Reject Verification")
      }
    >
      ❌
      <span>Reject Verification</span>
    </button>

    <button
      className="admin-btn teal"
      onClick={() =>
        console.log("Feature Profile")
      }
    >
      ⭐
      <span>Feature Profile</span>
    </button>

    <button
      className="admin-btn indigo"
      onClick={() =>
        console.log("Suspend Profile")
      }
    >
      🚫
      <span>Suspend Profile</span>
    </button>

    <button
      className="admin-btn dark"
      onClick={() => {

        navigator.clipboard.writeText(
          profile.uid
        );

        alert("UID copied.");

      }}
    >
      📋
      <span>Copy UID</span>
    </button>

    <button
      className="admin-btn blue"
      onClick={() => {

        navigator.clipboard.writeText(
          profile.userProfile?.phoneNumber || ""
        );

        alert("Phone number copied.");

      }}
    >
      📞
      <span>Copy Phone</span>
    </button>

    <button
      className="admin-btn purple"
      onClick={() =>
        window.open(
          `https://wa.me/${(profile.userProfile?.phoneNumber || "").replace(/\+/g, "")}`,
          "_blank"
        )
      }
    >
      💬
      <span>WhatsApp User</span>
    </button>

    <button
      className="admin-btn teal"
      onClick={() =>
        window.open(
          `https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`,
          "_blank"
        )
      }
    >
      📍
      <span>Open Location</span>
    </button>

    <button
      className="admin-btn dark"
      onClick={() => {

        navigator.clipboard.writeText(
          profile.documentId
        );

        alert("Profile ID copied.");

      }}
    >
      📄
      <span>Copy Profile ID</span>
    </button>

    <button
      className="admin-btn red"
      onClick={async () => {

    const confirmed = window.confirm(
        "Are you sure you want to permanently delete this flatmate profile?"
    );

    if (!confirmed) return;

    const result =
        await deleteFlatmateProfile(
            uid,
            profileId
        );

    if (result.success) {

        alert(result.message);

        navigate("/admin/flatmates");

    } else {

        alert(
            result.message ||
            "Failed to delete flatmate profile."
        );

    }

}}
    >
      🗑
      <span>Delete Profile</span>
    </button>

  </div>

</div>
            </div>

        </PageLayout>

    );

}

export default FlatmateDetails;