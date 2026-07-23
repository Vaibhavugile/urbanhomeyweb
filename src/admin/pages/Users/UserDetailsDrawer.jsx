import React, {
  useEffect,
  useState,
} from "react";


import {
  getUserListings,
} from "../../services/listingService";

import {
  getUserFlatmateProfiles,
} from "../../services/flatmateService";

import { MdClose } from "react-icons/md";
import "./UserDetailsDrawer.css";

function UserDetailsDrawer({
  open,
  user,
  onClose,
}) {
const [activeTab, setActiveTab] =
  useState("overview");

const [listings, setListings] =
  useState([]);

const [flatmateProfiles, setFlatmateProfiles] =
  useState([]);

const [loading, setLoading] =
  useState(false);

  useEffect(() => {
  if (!open || !user?.uid) return;

  loadUserData();
}, [open, user]);

async function loadUserData() {
  try {
    setLoading(true);

    const [
      listingsData,
      flatmateData,
    ] = await Promise.all([
      getUserListings(user.uid),
      getUserFlatmateProfiles(user.uid),
    ]);

    setListings(listingsData);

    setFlatmateProfiles(flatmateData);

  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
}
    return (
    <div className={`drawer-overlay ${open ? "show" : ""}`}>
      <div className={`user-drawer ${open ? "open" : ""}`}>
<div className="drawer-tabs">

  <button
    className={activeTab==="overview" ? "active" : ""}
    onClick={()=>setActiveTab("overview")}
  >
    Overview
  </button>

  <button
    className={activeTab==="listings" ? "active" : ""}
    onClick={()=>setActiveTab("listings")}
  >
    Listings
  </button>

  <button
    className={activeTab==="profiles" ? "active" : ""}
    onClick={()=>setActiveTab("profiles")}
  >
    Flatmates
  </button>

  <button
    className={activeTab==="admin" ? "active" : ""}
    onClick={()=>setActiveTab("admin")}
  >
    Admin
  </button>

</div>
        <div className="drawer-header">

          <h2>User Details</h2>

          <button
            className="drawer-close"
            onClick={onClose}
          >
            <MdClose />
          </button>

        </div>

        {!user ? (
          <div className="drawer-empty">
            No user selected.
          </div>
        ) : (
          <div className="drawer-body">

            {/* Profile Header */}
            {activeTab==="overview" && (
                <>
<div className="user-profile-header">

  <img
    src={
      user.profilePhotoUrl ||
      "https://placehold.co/120x120"
    }
    alt={user.name}
    className="user-avatar"
  />

  <div className="user-header-info">

    <h2>{user.name}</h2>

    <p>{user.phoneNumber}</p>

    <div className="user-header-badges">

      <span className="plan-badge">
        {user.currentPlan || "Free"}
      </span>

      <span
        className={`verify-badge ${
          user.isVerified ? "verified" : "not-verified"
        }`}
      >
        {user.isVerified
          ? "Verified"
          : "Not Verified"}
      </span>

    </div>

  </div>

</div>
<div className="drawer-card">

  <div className="drawer-card-title">
    👤 Personal Information
  </div>

  <div className="info-grid">

    <div className="info-item">
      <span>UID</span>
      <strong>{user.uid || "-"}</strong>
    </div>

    <div className="info-item">
      <span>Gender</span>
      <strong>{user.gender || "-"}</strong>
    </div>

    <div className="info-item">
      <span>Age</span>
      <strong>{user.age || "-"}</strong>
    </div>

    <div className="info-item">
      <span>Occupation</span>
      <strong>{user.occupation || "-"}</strong>
    </div>

    <div className="info-item">
      <span>Religion</span>
      <strong>{user.religion || "-"}</strong>
    </div>

    <div className="info-item">
      <span>Location</span>
      <strong>
        {user.locationName || user.city || "-"}
      </strong>
    </div>

    <div className="info-item">
      <span>Joined</span>
      <strong>
        {user.createdAt?.toDate?.().toLocaleDateString() || "-"}
      </strong>
    </div>

    <div className="info-item">
      <span>Last Login</span>
      <strong>
        {user.lastLogin?.toDate?.().toLocaleString() || "-"}
      </strong>
    </div>

  </div>

</div>

            {/* Subscription */}
<div className="drawer-card">

  <div className="drawer-card-title">
    💳 Subscription & Credits
  </div>

  <div className="info-grid">

    <div className="info-item">
      <span>Current Plan</span>
      <strong>{user.currentPlan || "Free"}</strong>
    </div>

    <div className="info-item">
      <span>Product ID</span>
      <strong>{user.currentPlanProductId || "-"}</strong>
    </div>

    <div className="info-item">
      <span>Plan Contacts</span>
      <strong>{user.currentPlanContacts ?? 0}</strong>
    </div>

    <div className="info-item">
      <span>Remaining Contacts</span>
      <strong>{user.remainingContacts ?? 0}</strong>
    </div>

    <div className="info-item">
      <span>Purchase Date</span>
      <strong>
        {user.planPurchaseDate?.toDate?.().toLocaleString() || "-"}
      </strong>
    </div>

    <div className="info-item">
      <span>Welcome Credits</span>
      <strong>
        {user.welcomeContactsGranted
          ? "Granted"
          : "Not Granted"}
      </strong>
    </div>

  </div>

  <div className="subscription-actions">

    <button className="primary-btn">
      Change Plan
    </button>

    <button className="secondary-btn">
      Add Contacts
    </button>

    <button className="secondary-btn">
      Reset Credits
    </button>

  </div>

</div>
            {/* Verification */}
<div className="drawer-card">

  <div className="drawer-card-title">
    ✅ Verification
  </div>

  <div className="info-grid">

    <div className="info-item">
      <span>Status</span>
      <strong>
        {user.verification?.verificationStatus ??
          "Not Verified"}
      </strong>
    </div>

    <div className="info-item">
      <span>Verified</span>
      <strong>
        {user.isVerified ? "Yes" : "No"}
      </strong>
    </div>

    <div className="info-item">
      <span>Welcome Credits</span>
      <strong>
        {user.welcomeContactsGranted
          ? "Granted"
          : "Not Granted"}
      </strong>
    </div>

    <div className="info-item">
      <span>FCM Token</span>
      <strong>
        {user.fcmToken ? "Available" : "Missing"}
      </strong>
    </div>

  </div>

  <div className="verification-actions">

    <button className="verify-btn">
      Approve
    </button>

    <button className="reject-btn">
      Reject
    </button>

  </div>

</div>

<div className="drawer-card">

  <div className="drawer-card-title">
    📊 Activity Overview
  </div>

  <div className="activity-grid">

    <div className="activity-box">
      <h3>🏠</h3>
      <h2>{user.totalListings ?? 0}</h2>
      <p>Listings</p>
    </div>

    <div className="activity-box">
      <h3>👥</h3>
      <h2>{user.totalFlatmateProfiles ?? 0}</h2>
      <p>Flatmate Profiles</p>
    </div>

    <div className="activity-box">
      <h3>❤️</h3>
      <h2>{user.totalMatches ?? 0}</h2>
      <p>Matches</p>
    </div>

    <div className="activity-box">
      <h3>💬</h3>
      <h2>{user.totalChats ?? 0}</h2>
      <p>Chats</p>
    </div>

    <div className="activity-box">
      <h3>👍</h3>
      <h2>{user.totalLikes ?? 0}</h2>
      <p>Likes</p>
    </div>

    <div className="activity-box">
      <h3>🚩</h3>
      <h2>{user.totalReports ?? 0}</h2>
      <p>Reports</p>
    </div>

  </div>

</div>
</>
            )}
            {/* Flatmate Profiles */}
{activeTab === "listings" && (
<>
<div className="drawerr-card">

<div className="drawerr-card-title">
🏠 Flat Listings
</div>

{listings.length ? (

<div className="listingg-list">

{listings.map((listing) => (

<div
className="listingg-card"
key={listing.documentId}
>

<div className="listingg-top">

<img
src={
listing.imageUrls?.[0] ||
"https://placehold.co/180x140"
}
alt=""
/>

<div className="listingg-user">

<h3>
{listing.userProfile?.name}
</h3>

<p>
📍 {listing.locationName}
</p>

<div className="listingg-badges">

<span className="listingg-price">
₹ {(listing.rentPrice ?? 0).toLocaleString("en-IN")}/month
</span>

<span className="listingg-chip">
{listing.flatType}
</span>

<span className="listingg-chip">
{listing.roomType}
</span>

<span className="listingg-chip">
{listing.furnishedStatus}
</span>

</div>

</div>

</div>

<div className="listingg-grid">

<div>
<label>Deposit</label>
<strong>
₹ {(listing.depositAmount ?? 0).toLocaleString("en-IN")}
</strong>
</div>

<div>
<label>Lease</label>
<strong>
{listing.leaseDuration || "-"}
</strong>
</div>

<div>
<label>Occupants</label>
<strong>
{listing.currentOccupants || "-"}
</strong>
</div>

<div>
<label>Preferred Gender</label>
<strong>
{listing.preferredFlatmateGender || "-"}
</strong>
</div>

<div>
<label>Preferred Occupation</label>
<strong>
{listing.preferredOccupation || "-"}
</strong>
</div>

<div>
<label>Verification</label>
<strong>
{listing.userProfile?.isVerified
? "Verified"
: "Not Verified"}
</strong>
</div>

</div>

{!!listing.amenities?.length && (

<div className="listingg-tags">

{listing.amenities.map((item) => (

<span key={item}>
{item}
</span>

))}

</div>

)}

{!!listing.idealQualities?.length && (

<div className="listingg-tags">

{listing.idealQualities.map((item) => (

<span key={item}>
{item}
</span>

))}

</div>

)}

<div className="listingg-actions">

<button className="primary-btn">
View Listing
</button>

<button className="secondary-btn">
Edit Listing
</button>

</div>

</div>

))}

</div>

) : (

<div className="empty-card">
No Flat Listings Found
</div>

)}

</div>
</>
)}
{activeTab === "profiles" && (
  <>
    <div className="drawerr-card">

      <div className="drawerr-card-title">
        👥 Flatmate Profiles
      </div>

      {flatmateProfiles.length ? (

        <div className="profilee-list">

          {flatmateProfiles.map((profile) => (

            <div
              className="profilee-card"
              key={profile.documentId}
            >

              <div className="profilee-top">

                <img
                  src={
                    profile.userProfile?.profilePhotoUrl ||
                    "https://placehold.co/140x140"
                  }
                  alt={profile.userProfile?.name}
                />

                <div className="profilee-user-info">

                  <h3>
                    {profile.userProfile?.name || "-"}
                  </h3>

                  <p>
                    📍 {profile.locationName || profile.city || "-"}
                  </p>

                  <div className="profilee-status-row">

                    <span className="profilee-badge">
                      👤 {profile.userProfile?.gender || "-"}
                    </span>

                    <span className="profilee-badge">
                      🎂 {profile.userProfile?.age || "-"} Years
                    </span>

                    <span className="profilee-badge">
                      💼 {profile.userProfile?.occupation || "-"}
                    </span>

                    <span
                      className={
                        profile.userProfile?.isVerified
                          ? "status verified"
                          : "status pending"
                      }
                    >
                      {profile.userProfile?.isVerified
                        ? "Verified"
                        : "Not Verified"}
                    </span>

                  </div>

                </div>

              </div>

              <div className="profilee-grid">

                <div>
                  <label>Religion</label>
                  <strong>
                    {profile.userProfile?.religion || "-"}
                  </strong>
                </div>

                <div>
                  <label>Budget</label>
                  <strong>
                    ₹{(profile.budgetMin ?? 0).toLocaleString("en-IN")}
                    {" - "}
                    ₹{(profile.budgetMax ?? 0).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <label>Move In Date</label>
                  <strong>
                    {profile.moveInDate?.toDate
                      ? profile.moveInDate
                          .toDate()
                          .toLocaleDateString("en-IN")
                      : "-"}
                  </strong>
                </div>

                <div>
                  <label>Flat Type</label>
                  <strong>
                    {profile.flatRequirements?.preferredFlatType || "-"}
                  </strong>
                </div>

                <div>
                  <label>Room Type</label>
                  <strong>
                    {profile.flatRequirements?.preferredRoomType || "-"}
                  </strong>
                </div>

                <div>
                  <label>Furnished</label>
                  <strong>
                    {profile.flatRequirements?.preferredFurnishedStatus || "-"}
                  </strong>
                </div>

                <div>
                  <label>Preferred Gender</label>
                  <strong>
                    {profile.flatmatePreferences?.preferredFlatmateGender || "-"}
                  </strong>
                </div>

                <div>
                  <label>Preferred Occupation</label>
                  <strong>
                    {profile.flatmatePreferences?.preferredOccupation || "-"}
                  </strong>
                </div>

              </div>

              {(profile.flatRequirements?.amenitiesDesired?.length ||
                profile.flatmatePreferences?.preferredHabits?.length ||
                profile.flatmatePreferences?.idealQualities?.length) && (

                <div className="profilee-tags">

                  {profile.flatRequirements?.amenitiesDesired?.map((item) => (
                    <span key={`amenity-${item}`}>{item}</span>
                  ))}

                  {profile.flatmatePreferences?.preferredHabits?.map((item) => (
                    <span key={`habit-${item}`}>{item}</span>
                  ))}

                  {profile.flatmatePreferences?.idealQualities?.map((item) => (
                    <span key={`quality-${item}`}>{item}</span>
                  ))}

                </div>
              )}

              <div className="profilee-actions">

                <button className="primary-btn">
                  View Full Profile
                </button>

                <button className="secondary-btn">
                  Edit Profile
                </button>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="empty-card">
          No Flatmate Profiles Found
        </div>

      )}

    </div>
  </>
)}
            {/* Activity */}

            {/* Admin Actions */}
            {activeTab==="admin" && (
<>
<div className="drawer-card">

  <div className="drawer-card-title">
    ⚙️ Admin Actions
  </div>

  <div className="admin-actions-grid">

    <button className="admin-action primary">
      ✏ Edit User
    </button>

    <button className="admin-action blue">
      💳 Change Plan
    </button>

    <button className="admin-action green">
      🎁 Add Contacts
    </button>

    <button className="admin-action orange">
      📩 Send Notification
    </button>

    <button className="admin-action purple">
      📄 View Documents
    </button>

    <button className="admin-action dark">
      📱 View Devices
    </button>

    <button className="admin-action warning">
      🚫 Suspend User
    </button>

    <button className="admin-action danger">
      🗑 Delete User
    </button>

  </div>

</div>
</>
)}
          </div>
        )}


      </div>
    </div>
  );
}

export default UserDetailsDrawer;