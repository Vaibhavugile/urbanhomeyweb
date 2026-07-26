import React, {
  useState,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import {
  approveProfileImage,
  rejectProfileImage,
} from "./ProfileImageVerificationService";

import "./ProfileImageVerification.css";

function ProfileImageVerificationDetails() {

  const navigate = useNavigate();

  const location = useLocation();

  const user = location.state?.user;

  const [saving, setSaving] =
    useState(false);

  if (!user) {

    return (

      <PageLayout
        title="User not found"
        subtitle="Open this page from the Profile Image Verification screen."
      />

    );

  }

  /* ==========================================
      APPROVE
  ========================================== */

  async function handleApprove() {

    try {

      setSaving(true);

      await approveProfileImage(
        user
      );

      alert(
        "Profile image approved successfully."
      );

      navigate(
        "/admin/profile-image-verification"
      );

    } catch (e) {

      console.error(e);

      alert(
        "Unable to approve profile image."
      );

    } finally {

      setSaving(false);

    }

  }

  /* ==========================================
      REJECT
  ========================================== */

  async function handleReject() {

    if (
      !window.confirm(
        "Reject this profile image?"
      )
    ) {
      return;
    }

    try {

      setSaving(true);

      await rejectProfileImage(
        user
      );

      alert(
        "Profile image rejected."
      );

      navigate(
        "/admin/profile-image-verification"
      );

    } catch (e) {

      console.error(e);

      alert(
        "Unable to reject profile image."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <PageLayout
      title="Profile Image Review"
      subtitle="Review the uploaded profile photo."
    >

      <div className="listing-review-page">

        <div className="review-card">

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 35,
            }}
          >

            <img
  src={
    user.pendingProfilePhotoUrl ||
    user.profilePhotoUrl
  }
  alt="Profile"
  style={{
    width: 220,
    height: 220,
    borderRadius: "50%",
    objectFit: "cover",
    border: "8px solid #fff",
    boxShadow:
      "0 12px 30px rgba(0,0,0,.15)",
    cursor: "pointer",
    transition: "transform .25s ease",
  }}
  onClick={() =>
    window.open(
      user.pendingProfilePhotoUrl ||
      user.profilePhotoUrl,
      "_blank"
    )
  }
  onMouseOver={(e) => {
    e.currentTarget.style.transform =
      "scale(1.05)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform =
      "scale(1)";
  }}
/>

          </div>

          <div className="property-grid">

            <div className="property-item">

              <div className="property-title">
                Name
              </div>

              <div className="property-value">
                {user.name || "-"}
              </div>

            </div>

            <div className="property-item">

              <div className="property-title">
                Age
              </div>

              <div className="property-value">
                {user.age || "-"}
              </div>

            </div>

            <div className="property-item">

              <div className="property-title">
                Gender
              </div>

              <div className="property-value">
                {user.gender || "-"}
              </div>

            </div>

            <div className="property-item">

              <div className="property-title">
                City
              </div>

              <div className="property-value">
                {user.city || "-"}
              </div>

            </div>

            <div className="property-item">

              <div className="property-title">
                Occupation
              </div>

              <div className="property-value">
                {user.occupation || "-"}
              </div>

            </div>

            <div className="property-item">

              <div className="property-title">
                Phone
              </div>

              <div className="property-value">
                {user.phoneNumber || "-"}
              </div>

            </div>

          </div>

          <div className="review-actions">

            <button
              className="review-btn reject"
              onClick={handleReject}
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "❌ Reject"}

            </button>

            <button
              className="review-btn approve"
              onClick={handleApprove}
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "✅ Approve"}

            </button>

          </div>

        </div>

      </div>

    </PageLayout>

  );

}

export default ProfileImageVerificationDetails;