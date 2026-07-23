import React from "react";
import TableActions from "../../components/table/TableActions";
const badgeStyle = {
  padding: "6px 12px",
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

const formatDateTime = (timestamp) => {
  if (!timestamp) return "-";

  try {
    return timestamp.toDate().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
};

export const getUserColumns = ({
  onView,
  onEdit,
  onDelete,
}) => [
  {
    key: "profile",
    title: "User",

    render: (user) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          minWidth: 240,
        }}
      >
        <img
          src={
            user.profilePhotoUrl ||
            "https://placehold.co/60x60"
          }
          alt=""
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
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
            {user.name || "-"}
          </div>

          <div
            style={{
              color: "#6B7280",
              fontSize: 13,
            }}
          >
            {user.phoneNumber || "-"}
          </div>
        </div>
      </div>
    ),
  },

  {
    key: "uid",
    title: "UID",

    render: (user) => (
      <span
        style={{
          fontSize: 12,
          color: "#6B7280",
        }}
      >
        {user.uid || "-"}
      </span>
    ),
  },

  {
    key: "gender",
    title: "Gender",
  },

  {
    key: "age",
    title: "Age",
  },

  {
    key: "location",
    title: "Location",

    render: (user) =>
      user.locationName ||
      user.city ||
      "-",
  },

  {
    key: "occupation",
    title: "Occupation",
  },

  {
    key: "religion",
    title: "Religion",
  },

  {
    key: "currentPlan",
    title: "Plan",

    render: (user) => {
      const plan = user.currentPlan || "Free";

      let bg = "#E5E7EB";
      let color = "#374151";

      if (plan === "Basic") {
        bg = "#EDE9FE";
        color = "#6D28D9";
      }

      if (plan === "Premium") {
        bg = "#DCFCE7";
        color = "#15803D";
      }

      if (plan === "Pro") {
        bg = "#FEF3C7";
        color = "#B45309";
      }

      return (
        <span
          style={{
            ...badgeStyle,
            background: bg,
            color,
          }}
        >
          {plan}
        </span>
      );
    },
  },

  {
    key: "remainingContacts",
    title: "Contacts",

    render: (user) => (
      <strong>
        {user.remainingContacts ?? 0}
      </strong>
    ),
  },

  {
    key: "verification",
    title: "Verification",

    render: (user) => {
      const status =
        user.verification?.verificationStatus ||
        "not_verified";

      let bg = "#FEE2E2";
      let color = "#991B1B";

      if (status === "verified") {
        bg = "#DCFCE7";
        color = "#166534";
      }

      if (status === "pending") {
        bg = "#FEF3C7";
        color = "#92400E";
      }

      return (
        <span
          style={{
            ...badgeStyle,
            background: bg,
            color,
          }}
        >
          {status.replaceAll("_", " ")}
        </span>
      );
    },
  },

  {
    key: "isVerified",
    title: "Verified",

    render: (user) =>
      user.isVerified ? "✅" : "❌",
  },

  {
    key: "createdAt",
    title: "Joined",

    render: (user) =>
      formatDate(user.createdAt),
  },

  {
    key: "lastLogin",
    title: "Last Login",

    render: (user) =>
      formatDateTime(user.lastLogin),
  },

  {
    key: "token",
    title: "FCM",

    render: (user) => (
      <span
        style={{
          color: user.fcmToken
            ? "#16A34A"
            : "#DC2626",
          fontWeight: 700,
        }}
      >
        {user.fcmToken ? "Available" : "Missing"}
      </span>
    ),
  },

{
  key: "actions",
  title: "Actions",

  render: (user) => (
    <TableActions
      row={user}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ),
},
];