import React, { useState } from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import {
  approveListingImages,
  rejectListingImages,
} from "./ListingImageVerificationService";

import "./ListingImageVerification.css";

function ListingImageVerificationDetails() {

  const navigate = useNavigate();

  const location = useLocation();

  const listing = location.state?.listing;

  const [saving, setSaving] =
    useState(false);

  if (!listing) {

    return (

      <PageLayout
        title="Listing not found"
        subtitle="Open this page from the Listing Image Verification screen."
      />

    );

  }

  /* ==========================================
      APPROVE
  ========================================== */

  async function handleApprove() {

    try {

      setSaving(true);

      await approveListingImages(
        listing
      );

      alert(
        "Images approved successfully."
      );

      navigate(
        "/admin/listing-image-verification"
      );

    } catch (e) {

      console.error(e);

      alert(
        "Unable to approve images."
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
        "Reject all pending images?"
      )
    ) {
      return;
    }

    try {

      setSaving(true);

      await rejectListingImages(
        listing
      );

      alert(
        "Images rejected."
      );

      navigate(
        "/admin/listing-image-verification"
      );

    } catch (e) {

      console.error(e);

      alert(
        "Unable to reject images."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <PageLayout
      title="Listing Image Review"
      subtitle="Review pending listing images."
    >

      <div className="listing-review-page">

        <div className="review-card">

          <div className="review-header">

            <div className="review-left">

              <h2>
                {listing.flatType}
              </h2>

              <div className="review-location">

                📍 {listing.locationName}

              </div>

              <div className="review-badges">

                <div className="review-chip">
                  {listing.roomType}
                </div>

                <div className="review-chip">
                  ₹{Number(
                    listing.rentPrice || 0
                  ).toLocaleString()}
                </div>

                <div className="review-chip">
                  {listing.furnishedStatus}
                </div>

                <div className="review-chip pending-chip">
                  Pending Verification
                </div>

              </div>

            </div>

          </div>

          {/* OWNER */}

          <div className="owner-card">

            <img
              className="owner-avatar"
              src={
                listing.userProfile
                  ?.profilePhotoUrl ||
                "https://placehold.co/100x100"
              }
              alt=""
            />

            <div>

              <div className="owner-name">

                {listing.userProfile?.name}

              </div>

              <div className="owner-sub">

                {listing.userProfile?.occupation}

              </div>

              <div className="owner-sub">

                {listing.city}

              </div>

            </div>

          </div>

          {/* PROPERTY INFO */}

          <div className="property-grid">

            <div className="property-item">

              <div className="property-title">
                Rent
              </div>

              <div className="property-value">

                ₹{Number(
                  listing.rentPrice || 0
                ).toLocaleString()}

              </div>

            </div>

            <div className="property-item">

              <div className="property-title">
                Flat Type
              </div>

              <div className="property-value">

                {listing.flatType}

              </div>

            </div>

            <div className="property-item">

              <div className="property-title">
                Room Type
              </div>

              <div className="property-value">

                {listing.roomType}

              </div>

            </div>

            <div className="property-item">

              <div className="property-title">
                Furnished
              </div>

              <div className="property-value">

                {listing.furnishedStatus}

              </div>

            </div>

          </div>

          {/* IMAGES */}

          <div className="review-grid">

            {listing.pendingImageUrls?.map(
              (url, index) => (

                <img
                  key={index}
                  className="review-image"
                  src={url}
                  alt={`Listing ${index + 1}`}
                  onClick={() =>
                    window.open(
                      url,
                      "_blank"
                    )
                  }
                />

              )
            )}

          </div>

          {/* ACTIONS */}

          <div className="review-actions">

            <button
              className="review-btn reject"
              onClick={handleReject}
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "❌ Reject Images"}

            </button>

            <button
              className="review-btn approve"
              onClick={handleApprove}
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "✅ Approve Images"}

            </button>

          </div>

        </div>

      </div>

    </PageLayout>

  );

}

export default ListingImageVerificationDetails;