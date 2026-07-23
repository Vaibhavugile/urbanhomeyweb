import React from "react";
import {
  MdVerified,
  MdHourglassTop,
  MdGppBad,
  MdShield,
  MdDescription,
} from "react-icons/md";

import TableActions from "../../components/table/TableActions";

const badgeStyle = {
  padding: "8px 16px",
  borderRadius: "999px",
  fontSize: 12,
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
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

export const verificationColumns = ({
  onView,
}) => [

  /* -----------------------------------------
     USER
  ----------------------------------------- */

  {
    key: "user",

    title: "User",

    render: (user) => (

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          minWidth: 270,
        }}
      >

        <img
          src={
            user.profilePhotoUrl ||
            "https://placehold.co/70x70"
          }
          alt={user.name}
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
            {user.name}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#6B7280",
            }}
          >
            {user.phoneNumber}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#9CA3AF",
              marginTop: 3,
            }}
          >
            UID : {user.uid}
          </div>

        </div>

      </div>

    ),

  },

  /* -----------------------------------------
     CITY
  ----------------------------------------- */

  {
    key: "city",

    title: "City",
  },

  /* -----------------------------------------
     OCCUPATION
  ----------------------------------------- */

  {
    key: "occupation",

    title: "Occupation",
  },

  /* -----------------------------------------
     USER TYPE
  ----------------------------------------- */

  {
    key: "userType",

    title: "User Type",

    render: (user) => (

      <span
        style={{
          ...badgeStyle,
          background: "#EEF2FF",
          color: "#4F46E5",
        }}
      >
        {user.userType || "-"}
      </span>

    ),

  },

  /* -----------------------------------------
     DOCUMENT
  ----------------------------------------- */

  {
    key: "document",

    title: "Document",

    render: (user) => (

      <span
        style={{
          ...badgeStyle,
          background: "#EFF6FF",
          color: "#2563EB",
        }}
      >
        <MdDescription />

        {user.verification?.documentType || "-"}
      </span>

    ),

  },

  /* -----------------------------------------
     SUBMITTED
  ----------------------------------------- */

  {
    key: "submitted",

    title: "Submitted",

    render: (user) =>

      formatDate(
        user.verification?.submittedAt
      ),

  },

  /* -----------------------------------------
     STATUS
  ----------------------------------------- */

 {
  key: "status",

  title: "Status",

  render: (user) => {

    const status =
      (
        user.verification?.verificationStatus ||
        "not_verified"
      ).toLowerCase();

    let background = "#ECEFF1";
    let color = "#607D8B";
    let Icon = MdShield;
    let text = "Not Verified";

    if (user.isVerified) {

      background = "#DCFCE7";
      color = "#15803D";
      Icon = MdVerified;
      text = "Verified";

    }

    else if (status === "pending") {

      background = "#FEF3C7";
      color = "#B45309";
      Icon = MdHourglassTop;
      text = "Pending Review";

    }

    else if (status === "rejected") {

      background = "#FEE2E2";
      color = "#B91C1C";
      Icon = MdGppBad;
      text = "Rejected";

    }

    return (

      <span
        style={{
          ...badgeStyle,
          background,
          color,
        }}
      >
        <Icon />

        {text}

      </span>

    );

  },

},

  /* -----------------------------------------
     ACTIONS
  ----------------------------------------- */

  {
    key: "actions",

    title: "Actions",

    render: (user) => (
        

      <TableActions

        row={user}

        onView={onView}

      />

    ),

  },

];