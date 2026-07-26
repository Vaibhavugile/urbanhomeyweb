import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import {

  createRole,

  updateRole,

} from "./RoleService";
import PageLayout from "../../layout/PageLayout";

import "./Roles.css";

const permissionList = [

  {
    key: "dashboard",
    label: "Dashboard",
  },

  {
    key: "users",
    label: "Users",
  },

  {
    key: "listings",
    label: "Listings",
  },

  {
    key: "flatmates",
    label: "Flatmates",
  },

  {
    key: "listingImages",
    label: "Listing Images",
  },

  {
    key: "profileImages",
    label: "Profile Images",
  },

  {
    key: "verification",
    label: "Verification",
  },

  {
    key: "payments",
    label: "Payments",
  },

  {
    key: "reports",
    label: "Reports",
  },

  {
    key: "matches",
    label: "Matches",
  },

  {
    key: "plans",
    label: "Plans",
  },

  {
    key: "admins",
    label: "Admins",
  },

  {
    key: "roles",
    label: "Roles",
  },

  {
    key: "support",
    label: "Support",
  },

  {
    key: "settings",
    label: "Settings",
  },

];

function AddRole() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const editingRole =
    location.state?.role;

  const [roleName, setRoleName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    permissions,
    setPermissions,
  ] = useState({});

  useEffect(() => {

    if (!editingRole)
      return;

    setRoleName(
      editingRole.name || ""
    );

    setDescription(
      editingRole.description || ""
    );

    setPermissions(
      editingRole.permissions || {}
    );

  }, [editingRole]);

  function togglePermission(key) {

    setPermissions((prev) => ({

      ...prev,

      [key]: !prev[key],

    }));

  }

  async function handleSave() {

  if (!roleName.trim()) {

    alert("Please enter role name.");

    return;

  }

  try {

    if (editingRole) {

      await updateRole(

        editingRole.documentId,

        {

          roleName,

          description,

          permissions,

        }

      );

      alert(
        "Role updated successfully."
      );

    } else {

      await createRole({

        roleName,

        description,

        permissions,

      });

      alert(
        "Role created successfully."
      );

    }

    navigate("/admin/roles");

  } catch (e) {

    console.error(e);

    alert(
      "Unable to save role."
    );

  }

}

  return (

    <PageLayout

      title={
        editingRole
          ? "Edit Role"
          : "Add Role"
      }

      subtitle="Configure administrator permissions."

    >

      <div className="role-form-card">

        <div className="role-form-group">

          <label>

            Role Name

          </label>

          <input
            value={roleName}
            onChange={(e)=>
              setRoleName(
                e.target.value
              )
            }
            placeholder="Moderator"
          />

        </div>

        <div className="role-form-group">

          <label>

            Description

          </label>

          <textarea
            rows={4}
            value={description}
            onChange={(e)=>
              setDescription(
                e.target.value
              )
            }
            placeholder="Role description..."
          />

        </div>

        <h3>

          Permissions

        </h3>

        <div className="permission-grid">

          {permissionList.map(
            (permission) => (

              <label
                key={permission.key}
                className="permission-card"
              >

                <input
                  type="checkbox"
                  checked={
                    permissions[
                      permission.key
                    ] || false
                  }
                  onChange={()=>
                    togglePermission(
                      permission.key
                    )
                  }
                />

                <span>

                  {permission.label}

                </span>

              </label>

            )
          )}

        </div>

        <div className="role-actions">

          <button
            className="cancel-btn"
            onClick={()=>
              navigate(-1)
            }
          >

            Cancel

          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >

            Save Role

          </button>

        </div>

      </div>

    </PageLayout>

  );

}

export default AddRole;