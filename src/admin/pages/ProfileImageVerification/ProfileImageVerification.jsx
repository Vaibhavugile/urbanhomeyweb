import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";
import TableLayout from "../../components/table/TableLayout";

import {
  getProfileImages,
} from "./ProfileImageVerificationService";

import {
  profileImageVerificationColumns,
} from "./ProfileImageVerificationColumns";

import "./ProfileImageVerification.css";

function ProfileImageVerification() {

  const navigate = useNavigate();

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("pending");

  useEffect(() => {

    loadUsers();

  }, [statusFilter]);

  /* ==========================================
      LOAD USERS
  ========================================== */

  async function loadUsers() {

    try {

      setLoading(true);

      const data =
        await getProfileImages(
          statusFilter
        );

      setUsers(data);

    } catch (e) {

      console.error(e);

    } finally {

      setLoading(false);

    }

  }

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredUsers =
    users.filter((user) => {

      const keyword =
        search.toLowerCase();

      return (

        user.name
          ?.toLowerCase()
          .includes(keyword)

        ||

        user.city
          ?.toLowerCase()
          .includes(keyword)

        ||

        user.phoneNumber
          ?.toLowerCase()
          .includes(keyword)

      );

    });

  /* ==========================================
      TABLE
  ========================================== */

  const columns =
    profileImageVerificationColumns({

      onView: (user) => {

        navigate(

          `/admin/profile-image-verification/${user.documentId}`,

          {

            state: {

              user,

            },

          }

        );

      },

    });

  return (

    <PageLayout
      title="Profile Image Verification"
      subtitle="Review user profile photos."
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 12,
        }}
      >

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >

          <option value="pending">
            Pending
          </option>

          <option value="approved">
            Approved
          </option>

          <option value="rejected">
            Rejected
          </option>

          <option value="all">
            All
          </option>

        </select>

      </div>

      <TableLayout

        title="Profile Photos"

        total={filteredUsers.length}

        columns={columns}

        data={filteredUsers}

        loading={loading}

        search={search}

        onSearch={setSearch}

        onRefresh={loadUsers}

        addLabel={null}

        emptyMessage="No profile image requests found."

      />

    </PageLayout>

  );

}

export default ProfileImageVerification;