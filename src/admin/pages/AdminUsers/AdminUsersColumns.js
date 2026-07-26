import React from "react";

export function adminUsersColumns({
  onEdit,
  onRemove,
}) {

  return [

    {
      key: "user",

      title: "User",

      render: (row) => (

        <div className="admin-table-user">

          <img
            src={
              row.profilePhotoUrl ||
              "https://placehold.co/60x60?text=UH"
            }
            alt=""
            className="admin-table-avatar"
          />

          <div>

            <strong>

              {row.name || "-"}

            </strong>

            <br/>

            <span>

              {row.phoneNumber || "-"}

            </span>

          </div>

        </div>

      ),

    },

    {
      key:"role",

      title:"Role",

      render:(row)=>(

        <span className="role-badge">

          {row.roleName || "-"}

        </span>

      ),

    },

    {
      key:"status",

      title:"Status",

      render:(row)=>(

        <span
          className={
            row.active
            ? "status-active"
            : "status-inactive"
          }
        >

          {row.active
            ? "Active"
            : "Inactive"}

        </span>

      ),

    },

    {
      key:"assigned",

      title:"Assigned",

      render:(row)=>{

        if(!row.assignedAt)
          return "-";

        const date =
          row.assignedAt.toDate();

        return (

          <div>

            {date.toLocaleDateString()}

            <br/>

            <span
              style={{
                color:"#888",
                fontSize:12,
              }}
            >

              {date.toLocaleTimeString()}

            </span>

          </div>

        );

      }

    },

    {
      key:"action",

      title:"Action",

      render:(row)=>(

        <div
          style={{
            display:"flex",
            gap:10,
          }}
        >

          <button
            className="table-action-btn"
            onClick={(e)=>{

              e.stopPropagation();

              onEdit(row);

            }}
          >

            Edit

          </button>

          <button
            className="table-delete-btn"
            onClick={(e)=>{

              e.stopPropagation();

              onRemove(row);

            }}
          >

            Remove

          </button>

        </div>

      ),

    },

  ];

}