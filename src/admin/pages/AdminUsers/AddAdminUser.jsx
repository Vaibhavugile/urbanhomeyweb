import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import {
  createAdminUser,
  updateAdminUser,
  getRolesForDropdown,
} from "./AdminUsersService";

import "./AdminUsers.css";

function AddAdminUser() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const editing =
    location.state?.user || null;

  const [roles, setRoles] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      fullName: "",

      username: "",

      email: "",

      password: "",

      phoneNumber: "",

      city: "",

      profilePhotoUrl: "",

    });

  const [roleId, setRoleId] =
    useState("");

  const [active, setActive] =
    useState(true);

  /* ==========================================
      LOAD ROLES
  ========================================== */

  useEffect(() => {

    loadRoles();

  }, []);

  async function loadRoles() {

    const data =
      await getRolesForDropdown();

    setRoles(data);

  }

  /* ==========================================
      EDIT MODE
  ========================================== */

  useEffect(() => {

    if (!editing)
      return;

    setFormData({

      fullName:
        editing.name || "",

      username:
        editing.username || "",

      email:
        editing.email || "",

      password: "",

      phoneNumber:
        editing.phoneNumber || "",

      city:
        editing.city || "",

      profilePhotoUrl:
        editing.profilePhotoUrl || "",

    });

    setRoleId(
      editing.roleId || ""
    );

    setActive(
      editing.active ?? true
    );

  }, [editing]);

  /* ==========================================
      INPUT CHANGE
  ========================================== */

  function handleChange(e) {

    const {

      name,

      value,

    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  }

  /* ==========================================
      SAVE
  ========================================== */

  async function handleSave() {

    if (!formData.fullName.trim()) {

      alert(
        "Please enter full name."
      );

      return;

    }

    if (!formData.username.trim()) {

      alert(
        "Please enter username."
      );

      return;

    }

    if (!formData.email.trim()) {

      alert(
        "Please enter email."
      );

      return;

    }

    if (!editing &&
        !formData.password.trim()) {

      alert(
        "Please enter password."
      );

      return;

    }

    if (!roleId) {

      alert(
        "Please select a role."
      );

      return;

    }

    try {

      setLoading(true);

      if (editing) {

        await updateAdminUser(

          editing.documentId,

          {

            ...formData,

            roleId,

            active,

          }

        );

        alert(
          "Admin updated successfully."
        );

      }

      else {

        await createAdminUser({

          ...formData,

          roleId,

          active,

        });

        alert(
          "Admin created successfully."
        );

      }

      navigate(
        "/admin/admin-users"
      );

    }

    catch (e) {

      console.error(e);

      alert(

        e.message ||

        "Unable to save admin."

      );

    }

    finally {

      setLoading(false);

    }

  }
  return (

  <PageLayout
    title={
      editing
        ? "Edit Admin User"
        : "Create Admin User"
    }
    subtitle="Create administrator accounts and assign roles."
  >

    <div className="role-form-card">

      <div className="role-form-group">

        <label>
          Full Name
        </label>

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
        />

      </div>

      <div className="role-form-group">

        <label>
          Username
        </label>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
        />

      </div>

      <div className="role-form-group">

        <label>
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          disabled={editing}
        />

      </div>

      {!editing && (

        <div className="role-form-group">

          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

        </div>

      )}

      <div className="role-form-group">

        <label>
          Phone Number
        </label>

        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
        />

      </div>

      <div className="role-form-group">

        <label>
          City
        </label>

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter city"
        />

      </div>

      <div className="role-form-group">

        <label>
          Profile Photo URL
        </label>

        <input
          type="text"
          name="profilePhotoUrl"
          value={formData.profilePhotoUrl}
          onChange={handleChange}
          placeholder="https://..."
        />

      </div>

      <div className="role-form-group">

        <label>
          Role
        </label>

        <select
          value={roleId}
          onChange={(e) =>
            setRoleId(
              e.target.value
            )
          }
        >

          <option value="">
            Select Role
          </option>

          {roles.map((role) => (

            <option
              key={role.documentId}
              value={role.documentId}
            >

              {role.name}

            </option>

          ))}

        </select>

      </div>

      <div className="role-form-group">

        <label>
          Status
        </label>

        <select
          value={
            active
              ? "active"
              : "inactive"
          }
          onChange={(e) =>
            setActive(
              e.target.value ===
              "active"
            )
          }
        >

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>

        </select>

      </div>

      <div className="role-actions">

        <button
          className="cancel-btn"
          onClick={() =>
            navigate(-1)
          }
        >

          Cancel

        </button>

        <button
          className="save-btn"
          onClick={handleSave}
          disabled={loading}
        >

          {loading

            ? "Saving..."

            : editing

            ? "Update Admin"

            : "Create Admin"}

        </button>

      </div>

    </div>

  </PageLayout>

);

}

export default AddAdminUser;