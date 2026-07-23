import React from "react";

import TableActions from "../../components/table/TableActions";

const badgeStyle = {
  padding: "7px 14px",
  borderRadius: "999px",
  fontSize: 12,
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const formatDate = (timestamp) => {
  if (!timestamp) return "-";

  try {
    return timestamp.toDate().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "-";
  }
};

export const flatListingColumns = ({
  onView,
  onEdit,
  onDelete,
}) => [
  {
    key: "listing",

    title: "Listing",

    render: (listing) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          minWidth: 260,
        }}
      >
        <img
          src={
            listing.imageUrls?.[0] ||
            "https://placehold.co/70x70"
          }
          alt=""
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            objectFit: "cover",
            border: "2px solid #E5E7EB",
          }}
        />

        <div>

          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            {listing.userProfile?.name || "-"}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#6B7280",
            }}
          >
            {listing.locationName || listing.city}
          </div>

        </div>

      </div>
    ),
  },

  {
    key: "rent",

    title: "Rent",

    render: (listing) => (
      <strong>
        ₹ {(listing.rentPrice ?? 0).toLocaleString("en-IN")}
      </strong>
    ),
  },

  {
    key: "flatType",

    title: "Flat Type",
  },

  {
    key: "roomType",

    title: "Room",
  },

  {
    key: "furnishedStatus",

    title: "Furnished",

    render: (listing) => (

      <span
        style={{
          ...badgeStyle,
          background: "#EEF2FF",
          color: "#4F46E5",
        }}
      >
        {listing.furnishedStatus || "-"}
      </span>

    ),
  },

  {
    key: "currentOccupants",

    title: "Occupants",
  },

  {
    key: "preferredFlatmateGender",

    title: "Looking For",
  },

  {
    key: "verification",

    title: "Verification",

    render: (listing) => (

      <span
        style={{
          ...badgeStyle,

          background: listing.userProfile?.isVerified
            ? "#DCFCE7"
            : "#FEE2E2",

          color: listing.userProfile?.isVerified
            ? "#166534"
            : "#991B1B",
        }}
      >
        {listing.userProfile?.isVerified
          ? "Verified"
          : "Not Verified"}
      </span>

    ),
  },

  {
    key: "createdAt",

    title: "Created",

    render: (listing) =>
      formatDate(listing.createdAt),
  },

  {
    key: "actions",

    title: "Actions",

    render: (listing) => (

      <TableActions
        row={listing}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />

    ),
  },
];