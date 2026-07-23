import React, {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import {
  getVerificationDetails,
} from "./VerificationDetailsService";
import {
  approveVerification,
  rejectVerification,
} from "./VerificationDetailsService";
import "./VerificationDetails.css";

function VerificationDetails() {

  const { userId } = useParams();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadUser();

  }, [userId]);

  async function loadUser() {

    setLoading(true);

    const data =
      await getVerificationDetails(userId);

    setUser(data);

    setLoading(false);

  }
  async function handleApprove() {

  if (
    !window.confirm(
      "Approve this verification?"
    )
  ) return;

  await approveVerification(user.documentId);

  alert(
    "User verified successfully."
  );

  loadUser();

}

async function handleReject() {

  const reason =
    window.prompt(
      "Reason for rejection?"
    );

  if (reason === null) return;

  await rejectVerification(
    user.documentId,
    reason
  );

  alert(
    "Verification rejected."
  );

  loadUser();

}

  if (loading) {

    return (
      <PageLayout title="Loading">

        Loading Verification...

      </PageLayout>
    );

  }

  if (!user) {

    return (
      <PageLayout title="Verification">

        Verification Not Found

      </PageLayout>
    );

  }

  return (

    <PageLayout

      title="Verification Review"

      subtitle="Review and verify user identity"

    >

      <div className="verification-page">

        {/* HERO */}
        <div className="details-section">

  <div className="section-title">

    📄 Uploaded Documents

  </div>

  <div className="verification-documents">

    {/* ============================
        SELFIE
    ============================ */}

    <div className="document-card">

      <div className="document-header">

        <div>

          <h3>🤳 Selfie Verification</h3>

          <p>
            Uploaded by user
          </p>

        </div>

        <span className="document-status">

          Pending Review

        </span>

      </div>

      <img
        src={user.verification?.selfieUrl}
        alt="Selfie Verification"
        onClick={() =>
          window.open(
            user.verification?.selfieUrl,
            "_blank"
          )
        }
      />

      <div className="document-actions">

        <button
          className="document-btn"
          onClick={() =>
            window.open(
              user.verification?.selfieUrl,
              "_blank"
            )
          }
        >

          🔍 View Full Size

        </button>

        <button
          className="document-btn secondary"
          onClick={() => {

            const link =
              document.createElement("a");

            link.href =
              user.verification?.selfieUrl;

            link.download = "selfie.jpg";

            link.click();

          }}
        >

          📥 Download

        </button>

      </div>

    </div>

    {/* ============================
        GOVERNMENT ID
    ============================ */}

    <div className="document-card">

      <div className="document-header">

        <div>

          <h3>

            🪪 Government ID

          </h3>

          <p>

            {user.verification?.documentType}

          </p>

        </div>

        <span className="document-status">

          Pending Review

        </span>

      </div>

      <img
        src={user.verification?.governmentIdUrl}
        alt="Government ID"
        onClick={() =>
          window.open(
            user.verification?.governmentIdUrl,
            "_blank"
          )
        }
      />

      <div className="document-actions">

        <button
          className="document-btn"
          onClick={() =>
            window.open(
              user.verification?.governmentIdUrl,
              "_blank"
            )
          }
        >

          🔍 View Full Size

        </button>

        <button
          className="document-btn secondary"
          onClick={() => {

            const link =
              document.createElement("a");

            link.href =
              user.verification?.governmentIdUrl;

            link.download = "government-id.jpg";

            link.click();

          }}
        >

          📥 Download

        </button>

      </div>

    </div>

  </div>

</div>
  <div className="details-section">

    <div className="section-title">

        🛠 Verification Actions

    </div>

    <div className="verification-action-cards">

        {/* APPROVE */}

        <div className="verification-action-card approve">

            <div className="action-icon">

                ✅

            </div>

            <h3>

                Approve Verification

            </h3>

            <p>

                Mark this user's identity as verified and
                allow the verified badge across the platform.

            </p>

            <button
                className="action-btn approve-btn"
                onClick={handleApprove}
            >

                Approve User

            </button>

        </div>

        {/* REJECT */}

        <div className="verification-action-card reject">

            <div className="action-icon">

                ❌

            </div>

            <h3>

                Reject Verification

            </h3>

            <p>

                Reject this verification request.
                The user will need to upload documents again.

            </p>

            <button
                className="action-btn reject-btn"
                onClick={handleReject}
            >

                Reject User

            </button>

        </div>

    </div>

</div>
  <div className="details-section">

          <div className="section-title">

            🛡 Verification Information

          </div>

          <div className="details-card">

            <div className="property-grid">

              <div className="property-item">

                <label>

                  Document Type

                </label>

                <strong>

                  {user.verification?.documentType}

                </strong>

              </div>

              <div className="property-item">

                <label>

                  Submitted

                </label>

                <strong>

                  {user.verification?.submittedAt?.toDate
                    ? user.verification.submittedAt
                        .toDate()
                        .toLocaleString("en-IN")
                    : "-"}

                </strong>

              </div>

              <div className="property-item">

                <label>

                  UID

                </label>

                <strong>

                  {user.uid}

                </strong>

              </div>

              <div className="property-item">

                <label>

                  Status

                </label>

                <strong>

                  {user.verification?.verificationStatus}

                </strong>

              </div>

            </div>

          </div>

        </div>
        <div className="verification-hero">

          <img
            src={
              user.profilePhotoUrl ||
              "https://placehold.co/160x160"
            }
            alt={user.name}
          />

          <div className="verification-summary">

            <span className="verification-type">

              Identity Verification

            </span>

            <h1>

              {user.name}

            </h1>

            <p>

              📍 {user.city}

            </p>

            <div className="verification-badges">

              <span>

                📞 {user.phoneNumber}

              </span>

              <span>

                💼 {user.occupation}

              </span>

              <span>

                👤 {user.gender}

              </span>

              <span>

                🛐 {user.religion}

              </span>

            </div>

            <div className="verification-status-row">

              {user.isVerified ? (

                <span className="status verified">

                  ✅ Verified

                </span>

              ) : user.verification?.verificationStatus === "pending" ? (

                <span className="status pending">

                  🟡 Pending Review

                </span>

              ) : user.verification?.verificationStatus === "rejected" ? (

                <span className="status rejected">

                  🔴 Rejected

                </span>

              ) : (

                <span className="status not">

                  ⚪ Not Verified

                </span>

              )}

            </div>

          </div>

        </div>

        {/* PERSONAL */}

        <div className="details-section">

          <div className="section-title">

            👤 Personal Information

          </div>

          <div className="details-card">

            <div className="property-grid">

              <div className="property-item">

                <label>Name</label>

                <strong>

                  {user.name}

                </strong>

              </div>

              <div className="property-item">

                <label>Phone</label>

                <strong>

                  {user.phoneNumber}

                </strong>

              </div>

              <div className="property-item">

                <label>Age</label>

                <strong>

                  {user.age}

                </strong>

              </div>

              <div className="property-item">

                <label>Gender</label>

                <strong>

                  {user.gender}

                </strong>

              </div>

              <div className="property-item">

                <label>Religion</label>

                <strong>

                  {user.religion}

                </strong>

              </div>

              <div className="property-item">

                <label>Occupation</label>

                <strong>

                  {user.occupation}

                </strong>

              </div>

            </div>

          </div>

        </div>

        {/* DOCUMENTS */}
{/* ==========================================================
    UPLOADED DOCUMENTS
========================================================== */}


        

        {/* VERIFICATION DETAILS */}

      

        {/* ACTIONS */}

  

      </div>

    </PageLayout>

  );

}

export default VerificationDetails;