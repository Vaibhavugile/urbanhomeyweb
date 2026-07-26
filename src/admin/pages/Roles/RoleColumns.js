import React from "react";

export function roleColumns({
  onView,
}) {

  return [

    {
      key: "name",

      title: "Role",

      render: (row) => (

        <div>

          <strong>

            {row.name || "-"}

          </strong>

          <br />

          <span
            style={{
              color: "#777",
              fontSize: 12,
            }}
          >

            {row.documentId}

          </span>

        </div>

      ),

    },

    {
      key: "description",

      title: "Description",

      render: (row) =>

        row.description || "-",

    },

    {
      key: "permissions",

      title: "Permissions",

      render: (row) => {

        const permissions =
          row.permissions || {};

        const enabled =
          Object.values(
            permissions
          ).filter(Boolean).length;

        return (

          <strong>

            {enabled}

          </strong>

        );

      },

    },

    {
      key: "status",

      title: "Status",

      render: (row) => (

        <span
          style={{
            color: row.active === false
              ? "#dc2626"
              : "#16a34a",
            fontWeight: 600,
          }}
        >

          {row.active === false
            ? "Inactive"
            : "Active"}

        </span>

      ),

    },

    {
      key: "created",

      title: "Created",

      render: (row) => {

        if (!row.createdAt)
          return "-";

        const date =
          row.createdAt.toDate();

        return (

          <div>

            {date.toLocaleDateString()}

            <br />

            <span
              style={{
                color: "#777",
                fontSize: 12,
              }}
            >

              {date.toLocaleTimeString()}

            </span>

          </div>

        );

      },

    },

    {
      key: "action",

      title: "Action",

      render: (row) => (

        <button
          className="table-action-btn"
          onClick={(e) => {

            e.preventDefault();

            e.stopPropagation();

            onView(row);

          }}
        >

          Edit

        </button>

      ),

    },

  ];

}