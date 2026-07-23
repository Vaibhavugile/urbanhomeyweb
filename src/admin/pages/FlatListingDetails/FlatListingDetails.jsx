import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";
import PageLayout from "../../layout/PageLayout";

import {
  getFlatListingById,
  deleteFlatListing,
} from "./FlatListingDetailsService";

import "./FlatListingDetails.css";

function FlatListingDetails() {

  const { uid, listingId } = useParams();
const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

useEffect(() => {
  if (listing?.imageUrls?.length) {
    setSelectedImage(listing.imageUrls[0]);
  }
}, [listing]);

  useEffect(() => {

    loadListing();

  }, [uid, listingId]);

  async function loadListing() {

    setLoading(true);

  const data =
  await getFlatListingById(
    uid,
    listingId
  );

    setListing(data);

    setLoading(false);

  }

  if (loading) {

    return (
      <PageLayout title="Loading...">

        Loading Listing...

      </PageLayout>
    );

  }

  if (!listing) {

    return (
      <PageLayout title="Listing">

        Listing Not Found

      </PageLayout>
    );

  }

  return (

    <PageLayout
      title="Flat Listing"
      subtitle="Manage property listing"
    >

      <div className="listing-details-page">

  {/* HERO */}

  <div className="listing-hero">

  {/* LEFT SIDE - IMAGE GALLERY */}

  <div className="listing-image">

    <div className="listing-main-image">

      <img
        src={
          selectedImage ||
          listing.imageUrls?.[0] ||
          "https://placehold.co/900x600"
        }
        alt={listing.flatType}
      />

    </div>

    {listing.imageUrls?.length > 1 && (

      <div className="listing-thumbnails">

        {listing.imageUrls.map((image, index) => (

          <div
            key={index}
            className={
              selectedImage === image
                ? "listing-thumbnail active"
                : "listing-thumbnail"
            }
            onClick={() => setSelectedImage(image)}
          >

            <img
              src={image}
              alt={`Listing ${index + 1}`}
            />

          </div>

        ))}

      </div>

    )}

  </div>

  {/* RIGHT SIDE - SUMMARY */}

  <div className="listing-summary">

    <span className="listing-type">

      🏠 {listing.flatType || "Property"}

    </span>

    <div className="listing-price">

      <h2>

        ₹
        {(listing.rentPrice ?? 0).toLocaleString("en-IN")}

      </h2>

      <span>/month</span>

    </div>

    <p className="listing-address">

      📍 {listing.locationName || "-"}

    </p>

    <div className="listing-badges">

      <span>

        🛏 {listing.roomType || "-"}

      </span>

      <span>

        🛋 {listing.furnishedStatus || "-"}

      </span>

      <span>

        👤 {listing.currentOccupants || "-"}

      </span>

      <span>

        📅 {listing.leaseDuration || "-"}

      </span>

      <span>

        💰 Deposit ₹
        {(listing.depositAmount ?? 0).toLocaleString("en-IN")}

      </span>

      <span>

        🚻 {listing.preferredFlatmateGender || "Anyone"}

      </span>

    </div>

    {/* <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: 16,
        marginTop: 28,
      }}
    >

      <div className="hero-stat">

        <label>Occupants</label>

        <strong>

          {listing.currentOccupants || "-"}

        </strong>

      </div>

      <div className="hero-stat">

        <label>Room Type</label>

        <strong>

          {listing.roomType || "-"}

        </strong>

      </div>

      <div className="hero-stat">

        <label>Furnished</label>

        <strong>

          {listing.furnishedStatus || "-"}

        </strong>

      </div>

      <div className="hero-stat">

        <label>Preferred Occupation</label>

        <strong>

          {listing.preferredOccupation || "-"}

        </strong>

      </div>

    </div> */}

    <div
      style={{
        display: "flex",
        gap: 14,
        marginTop: 30,
        flexWrap: "wrap",
      }}
    >

      <button className="primary-btn">

        ✏️ Edit Listing

      </button>

      <button
        className="secondary-btn"
        onClick={() =>
          window.open(
            `https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`,
            "_blank"
          )
        }
      >

        📍 View on Map

      </button>

    </div>

  </div>

</div>
  {/* OWNER INFORMATION */}

<div className="details-section">

  <div className="section-title">
    👤 Owner Information
  </div>

  <div className="owner-card">

    <img
      className="owner-avatar"
      src={
        listing.userProfile?.profilePhotoUrl ||
        "https://placehold.co/120x120"
      }
      alt={listing.userProfile?.name}
    />

    <div className="owner-info">

      <h2>
        {listing.userProfile?.name || "-"}
      </h2>

      <p>
        {listing.userProfile?.occupation || "-"}
      </p>

      <div className="owner-badges">

        <span>
          👤 {listing.userProfile?.gender || "-"}
        </span>

        <span>
          🎂 {listing.userProfile?.age || "-"} Years
        </span>

        <span>
          🛐 {listing.userProfile?.religion || "-"}
        </span>

        <span>
          📍 {listing.userProfile?.city || "-"}
        </span>

      </div>

    </div>

    <div className="owner-contact">

      <div>

        <label>Phone Number</label>

        <strong>
          {listing.userProfile?.phoneNumber || "-"}
        </strong>

      </div>

      <div>

        <label>Verification</label>

        <strong
          className={
            listing.userProfile?.isVerified
              ? "verified-text"
              : "pending-text"
          }
        >
          {listing.userProfile?.isVerified
            ? "Verified"
            : "Not Verified"}
        </strong>

      </div>

    </div>

  </div>

</div>
{/* PROPERTY DETAILS */}

<div className="details-section">

  <div className="section-title">
    🏠 Property Details
  </div>

  <div className="property-grid">

    <div className="property-item">
      <label>Monthly Rent</label>
      <strong>
        ₹ {(listing.rentPrice ?? 0).toLocaleString("en-IN")}
      </strong>
    </div>

    <div className="property-item">
      <label>Security Deposit</label>
      <strong>
        ₹ {(listing.depositAmount ?? 0).toLocaleString("en-IN")}
      </strong>
    </div>

    <div className="property-item">
      <label>Flat Type</label>
      <strong>
        {listing.flatType || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>Room Type</label>
      <strong>
        {listing.roomType || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>Furnished</label>
      <strong>
        {listing.furnishedStatus || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>Lease Duration</label>
      <strong>
        {listing.leaseDuration || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>Current Occupants</label>
      <strong>
        {listing.currentOccupants || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>Available For</label>
      <strong>
        {listing.availableFor || "Not Specified"}
      </strong>
    </div>

    <div className="property-item">
      <label>City</label>
      <strong>
        {listing.city || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>Profile Complete</label>
      <strong
        className={
          listing.isProfileComplete
            ? "verified-text"
            : "pending-text"
        }
      >
        {listing.isProfileComplete
          ? "Completed"
          : "Incomplete"}
      </strong>
    </div>

    <div
      className="property-item full-width"
    >
      <label>Property Description</label>

      <strong>
        {listing.flatDescription ||
          "No description added."}
      </strong>
    </div>

  </div>

</div>
{/* AMENITIES & PREFERENCES */}

<div className="details-section">

  <div className="section-title">
    ✨ Amenities & Preferences
  </div>

  {/* Amenities */}

  <div className="details-card">

    <h3 className="sub-section-title">
      🏠 Amenities
    </h3>

    <div className="chip-container">

      {listing.amenities?.length ? (

        listing.amenities.map((item) => (

          <span
            className="chip purple"
            key={item}
          >
            {item}
          </span>

        ))

      ) : (

        <span className="empty-text">
          No amenities added.
        </span>

      )}

    </div>

  </div>

  {/* Preferred Flatmate */}

  <div className="details-card">

    <h3 className="sub-section-title">
      👤 Preferred Flatmate
    </h3>

    <div className="property-grid">

      <div className="property-item">
        <label>Preferred Gender</label>
        <strong>
          {listing.preferredFlatmateGender || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Preferred Age</label>
        <strong>
          {listing.preferredFlatmateAge || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Preferred Occupation</label>
        <strong>
          {listing.preferredOccupation || "-"}
        </strong>
      </div>

    </div>

  </div>

  {/* Ideal Qualities */}

  <div className="details-card">

    <h3 className="sub-section-title">
      ⭐ Ideal Qualities
    </h3>

    <div className="chip-container">

      {listing.idealQualities?.length ? (

        listing.idealQualities.map((item) => (

          <span
            className="chip green"
            key={item}
          >
            {item}
          </span>

        ))

      ) : (

        <span className="empty-text">
          No ideal qualities specified.
        </span>

      )}

    </div>

  </div>

  {/* Deal Breakers */}

  <div className="details-card">

    <h3 className="sub-section-title">
      🚫 Deal Breakers
    </h3>

    <div className="chip-container">

      {listing.dealBreakers?.length ? (

        listing.dealBreakers.map((item) => (

          <span
            className="chip red"
            key={item}
          >
            {item}
          </span>

        ))

      ) : (

        <span className="empty-text">
          No deal breakers specified.
        </span>

      )}

    </div>

  </div>

</div>
{/* LIFESTYLE & HABITS */}

<div className="details-section">

  <div className="section-title">
    🌿 Lifestyle & Habits
  </div>

  <div className="property-grid">

    <div className="property-item">
      <label>🍽 Food Preference</label>
      <strong>
        {listing.userProfile?.habits?.food || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>🚭 Smoking</label>
      <strong>
        {listing.userProfile?.habits?.smoking || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>🍷 Drinking</label>
      <strong>
        {listing.userProfile?.habits?.drinking || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>🧹 Cleanliness</label>
      <strong>
        {listing.userProfile?.habits?.cleanliness || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>🐶 Pet Ownership</label>
      <strong>
        {listing.userProfile?.habits?.petOwnership || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>🐾 Pet Tolerance</label>
      <strong>
        {listing.userProfile?.habits?.petTolerance || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>🎉 Guests Frequency</label>
      <strong>
        {listing.userProfile?.habits?.guestsFrequency || "-"}
      </strong>
    </div>

    <div className="property-item">
      <label>🤝 Social Preference</label>
      <strong>
        {listing.userProfile?.habits?.socialPreferences || "-"}
      </strong>
    </div>

  </div>

</div>
{/* LOCATION & ACTIVITY */}

<div className="details-section">

  <div className="section-title">
    📍 Location & Activity
  </div>

  {/* Location */}

  <div className="details-card">

    <h3 className="sub-section-title">
      📍 Property Location
    </h3>

    <div className="property-grid">

      <div className="property-item full-width">
        <label>Complete Address</label>
        <strong>
          {listing.locationName || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>City</label>
        <strong>
          {listing.city || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Latitude</label>
        <strong>
          {listing.latitude ?? "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Longitude</label>
        <strong>
          {listing.longitude ?? "-"}
        </strong>
      </div>

      <div className="property-item full-width">
        <label>Google Place ID</label>
        <strong>
          {listing.placeId || "-"}
        </strong>
      </div>

    </div>

    {listing.latitude && listing.longitude && (

      <div style={{ marginTop: 20 }}>

        <a
          href={`https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="primary-btn"
        >
          📍 Open in Google Maps
        </a>

      </div>

    )}

  </div>

  {/* Activity */}

  <div className="details-card">

    <h3 className="sub-section-title">
      📊 Listing Activity
    </h3>

    <div className="property-grid">

      <div className="property-item">
        <label>Created On</label>
        <strong>
          {listing.createdAt?.toDate
            ? listing.createdAt
                .toDate()
                .toLocaleString("en-IN")
            : "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Last Updated</label>
        <strong>
          {listing.lastUpdated?.toDate
            ? listing.lastUpdated
                .toDate()
                .toLocaleString("en-IN")
            : "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>User UID</label>
        <strong>
          {listing.uid || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Firestore ID</label>
        <strong>
          {listing.documentId || "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>User Type</label>
        <strong>
          {listing.userProfile?.userType ||
          listing.userType ||
          "-"}
        </strong>
      </div>

      <div className="property-item">
        <label>Verification</label>
        <strong>
          {listing.userProfile?.verification
            ?.verificationStatus ||
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
        console.log("Edit Listing", listing)
      }
    >
      ✏️
      <span>Edit Listing</span>
    </button>

    <button
      className="admin-btn blue"
      onClick={() =>
        console.log("View Owner", listing.uid)
      }
    >
      👤
      <span>View Owner</span>
    </button>

    <button
      className="admin-btn green"
      onClick={() =>
        console.log("Feature Listing")
      }
    >
      ⭐
      <span>Feature Listing</span>
    </button>

    <button
      className="admin-btn orange"
      onClick={() =>
        console.log("Disable Listing")
      }
    >
      🚫
      <span>Disable Listing</span>
    </button>

    <button
      className="admin-btn dark"
      onClick={() => {

        navigator.clipboard.writeText(
          listing.documentId
        );

        alert("Listing ID copied.");

      }}
    >
      📋
      <span>Copy Listing ID</span>
    </button>

    <button
      className="admin-btn teal"
      onClick={() => {

        navigator.clipboard.writeText(
          listing.locationName || ""
        );

        alert("Address copied.");

      }}
    >
      📍
      <span>Copy Address</span>
    </button>

    <button
      className="admin-btn indigo"
      onClick={() =>
        window.open(
          `https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`,
          "_blank"
        )
      }
    >
      🗺
      <span>Open Map</span>
    </button>

    <button
      className="admin-btn red"
  onClick={async () => {
  const confirmed = window.confirm(
    "Are you sure you want to permanently delete this listing?"
  );

  if (!confirmed) return;

  const result = await deleteFlatListing(
    uid,
    listingId
  );

  if (result.success) {

    alert(result.message);

    navigate("/admin/listings");

  } else {

    alert(
      result.message ||
      "Failed to delete listing."
    );

  }
}}
    >
      🗑
      <span>Delete Listing</span>
    </button>

  </div>

</div>

</div>

    </PageLayout>

  );

}

export default FlatListingDetails;