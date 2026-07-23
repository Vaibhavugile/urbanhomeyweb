import React from "react";

import {
  MdCheckCircle,
  MdPending,
  MdError,
  MdPayments,
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

export const paymentColumns = ({

  onView,

}) => [

  /* ==========================================
     USER
  ========================================== */

  {

    key: "user",

    title: "User",

    render: (payment) => (

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          minWidth: 270,
        }}
      >

        <img
          src={
            payment.userPhoto ||
            "https://placehold.co/70x70"
          }
          alt=""
          style={{
            width: 60,
            height: 60,
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
            {payment.userName || "-"}
          </div>

          <div
            style={{
              color: "#6B7280",
              fontSize: 13,
            }}
          >
            {payment.userPhone}
          </div>

        </div>

      </div>

    ),

  },

  /* ==========================================
     PLAN
  ========================================== */

  {

    key: "plan",

    title: "Plan",

    render: (payment) => (

      <span
        style={{
          ...badgeStyle,
          background: "#EEF2FF",
          color: "#4F46E5",
        }}
      >

        <MdPayments />

        {payment.planName}

      </span>

    ),

  },

  /* ==========================================
     PURCHASE ID
  ========================================== */

  {

    key: "purchaseId",

    title: "Purchase ID",

    render: (payment) => (

      <span
        style={{
          fontWeight: 600,
          color: "#374151",
        }}
      >
        {payment.purchaseId}
      </span>

    ),

  },

  /* ==========================================
     CONTACTS
  ========================================== */

  {

    key: "contactsPurchased",

    title: "Contacts",

    render: (payment) => (

      <strong>

        {payment.contactsPurchased}

      </strong>

    ),

  },

  /* ==========================================
     STATUS
  ========================================== */

  {

    key: "status",

    title: "Status",

    render: (payment) => {

      let background = "#E5E7EB";

      let color = "#374151";

      let text = payment.status;

      let Icon = MdPending;

      if (payment.status === "completed") {

        background = "#DCFCE7";

        color = "#15803D";

        text = "Completed";

        Icon = MdCheckCircle;

      }

      else if (payment.status === "pending") {

        background = "#FEF3C7";

        color = "#B45309";

        text = "Pending";

        Icon = MdPending;

      }

      else if (payment.status === "failed") {

        background = "#FEE2E2";

        color = "#B91C1C";

        text = "Failed";

        Icon = MdError;

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

  /* ==========================================
     PURCHASE DATE
  ========================================== */

  {

    key: "purchaseDate",

    title: "Purchased",

    render: (payment) =>

      formatDate(payment.purchaseDate),

  },

  /* ==========================================
     ACTIONS
  ========================================== */

  {

    key: "actions",

    title: "Actions",

    render: (payment) => (

      <TableActions

        row={payment}

        onView={onView}

      />

    ),

  },

];