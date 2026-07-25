import React from "react";

export function profileImageVerificationColumns({
  onView,
}) {

  function getStatusStyle(status) {

    switch (status) {

      case "approved":
        return {
          background: "#DCFCE7",
          color: "#15803D",
        };

      case "rejected":
        return {
          background: "#FEE2E2",
          color: "#DC2626",
        };

      default:
        return {
          background: "#FEF3C7",
          color: "#B45309",
        };

    }

  }

  return [

    /* ==========================================
        PROFILE PHOTO
    ========================================== */

    {
      key: "photo",
      title: "Photo",

      render: (row) => {

        const image =
          row.pendingProfileImageUrl ||
          row.profilePhotoUrl;

        return image ? (

          <img
            src={image}
            alt=""
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #eee",
            }}
          />

        ) : (

          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontSize: 12,
            }}
          >
            No Photo
          </div>

        );

      },

    },

    /* ==========================================
        USER
    ========================================== */

    {
      key: "user",
      title: "User",

      render: (row) => (

        <div>

          <div
            style={{
              fontWeight: 700,
            }}
          >
            {row.name || "-"}
          </div>

          <div
            style={{
              color: "#777",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {row.uid}
          </div>

        </div>

      ),

    },

    /* ==========================================
        DETAILS
    ========================================== */

    {
      key: "details",
      title: "Details",

      render: (row) => (

        <div>

          <div>
            {row.gender || "-"}
          </div>

          <div
            style={{
              color: "#777",
              fontSize: 12,
            }}
          >
            {row.age || "-"} Years
          </div>

        </div>

      ),

    },

    /* ==========================================
        CITY
    ========================================== */

    {
      key: "city",
      title: "City",

      render: (row) =>
        row.city || "-",

    },

    /* ==========================================
        SUBMITTED
    ========================================== */

    {
      key: "submitted",
      title: "Submitted",

      render: (row) => {

        if (!row.createdAt)
          return "-";

        const date =
          row.createdAt.toDate();

        return (

          <div>

            <div>
              {date.toLocaleDateString()}
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#777",
              }}
            >
              {date.toLocaleTimeString()}
            </div>

          </div>

        );

      },

    },

    /* ==========================================
        STATUS
    ========================================== */

    {
      key: "status",
      title: "Status",

      render: (row) => {

        const status =
          row.profileImageVerificationStatus ||
          "pending";

        return (

          <span
            style={{
              padding: "6px 12px",
              borderRadius: 50,
              fontWeight: 700,
              fontSize: 12,
              textTransform: "capitalize",
              ...getStatusStyle(status),
            }}
          >
            {status}
          </span>

        );

      },

    },

    /* ==========================================
        ACTION
    ========================================== */

    {
      key: "action",
      title: "Action",

      render: (row) => (

        <button
          type="button"
          className="table-action-btn"
          onClick={(e) => {

            e.preventDefault();

            e.stopPropagation();

            onView(row);

          }}
        >
          Review
        </button>

      ),

    },

  ];

}