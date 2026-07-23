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

    return timestamp
      .toDate()
      .toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  } catch {

    return "-";

  }

};

export const flatmateColumns = ({
  onView,
  onEdit,
  onDelete,
}) => [

  {
    key: "profile",

    title: "Profile",

    render: (profile) => (

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
            profile.userProfile?.profilePhotoUrl ||
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
            {profile.userProfile?.name || "-"}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#6B7280",
            }}
          >
            {profile.locationName || profile.city || "-"}
          </div>

        </div>

      </div>

    ),
  },

  {
    key: "gender",

    title: "Gender",

    render: (profile) =>
      profile.userProfile?.gender || "-",
  },

  {
    key: "age",

    title: "Age",

    render: (profile) =>
      profile.userProfile?.age
        ? `${profile.userProfile.age} Years`
        : "-",
  },

  {
    key: "occupation",

    title: "Occupation",

    render: (profile) =>
      profile.userProfile?.occupation || "-",
  },

  {
    key: "budget",

    title: "Budget",

    render: (profile) => (

      <strong>

        ₹
        {(profile.budgetMin ?? 0).toLocaleString("en-IN")}

        {" - "}

        ₹
        {(profile.budgetMax ?? 0).toLocaleString("en-IN")}

      </strong>

    ),
  },

  {
    key: "moveIn",

    title: "Move In",

    render: (profile) =>
      formatDate(profile.moveInDate),
  },

  {
    key: "verification",

    title: "Verification",

    render: (profile) => (

      <span
        style={{
          ...badgeStyle,

          background:
            profile.userProfile?.isVerified
              ? "#DCFCE7"
              : "#FEE2E2",

          color:
            profile.userProfile?.isVerified
              ? "#166534"
              : "#991B1B",
        }}
      >

        {profile.userProfile?.isVerified
          ? "Verified"
          : "Not Verified"}

      </span>

    ),
  },

  {
    key: "created",

    title: "Created",

    render: (profile) =>
      formatDate(profile.createdAt),
  },

  {
    key: "actions",

    title: "Actions",

    render: (profile) => (

      <TableActions
        row={profile}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />

    ),
  },

];