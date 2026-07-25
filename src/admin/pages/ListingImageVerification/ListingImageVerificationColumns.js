import React from "react";

export function listingImageVerificationColumns({
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
        IMAGE
    ========================================== */

    {
      key: "image",
      title: "Image",

      render: (row) => {

        const image =
          row.pendingImageUrls?.[0] ||
          row.imageUrls?.[0];

        return image ? (

          <img
            src={image}
            alt=""
            style={{
              width: 72,
              height: 72,
              borderRadius: 14,
              objectFit: "cover",
              border: "1px solid #eee",
            }}
          />

        ) : (

          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 14,
              background: "#F5F5F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontSize: 12,
            }}
          >
            No Image
          </div>

        );

      },

    },

    /* ==========================================
        OWNER
    ========================================== */

    {
      key: "owner",
      title: "Owner",

      render: (row) => (

        <div>

          <div
            style={{
              fontWeight: 700,
            }}
          >
            {row.userProfile?.name || "-"}
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
        PROPERTY
    ========================================== */

    {
      key: "property",
      title: "Property",

      render: (row) => (

        <div>

          <div
            style={{
              fontWeight: 700,
            }}
          >
            {row.flatType || "-"}
          </div>

          <div
            style={{
              color: "#777",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {row.roomType || "-"}
          </div>

        </div>

      ),

    },

    /* ==========================================
        RENT
    ========================================== */

    {
      key: "rent",
      title: "Rent",

      render: (row) =>

        `₹${Number(
          row.rentPrice || 0
        ).toLocaleString()}`,

    },

    /* ==========================================
        LOCATION
    ========================================== */

    {
      key: "location",
      title: "Location",

      render: (row) => (

        <div>

          <div>
            {row.city || "-"}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#777",
              marginTop: 3,
              maxWidth: 180,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row.locationName}
          </div>

        </div>

      ),

    },

    /* ==========================================
        IMAGES
    ========================================== */

    {
      key: "images",
      title: "Images",

      render: (row) =>

        row.imageVerificationStatus ===
        "pending"

          ? row.pendingImageUrls?.length || 0

          : row.imageUrls?.length || 0,

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
                marginTop: 3,
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
          row.imageVerificationStatus ||
          "pending";

        const style =
          getStatusStyle(status);

        return (

          <span
            style={{
              padding:
                "6px 12px",
              borderRadius: 50,
              fontSize: 12,
              fontWeight: 700,
              textTransform:
                "capitalize",
              ...style,
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