import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";
import TableLayout from "../../components/table/TableLayout";

import {
  getVerificationRequests,
} from "./VerificationService";

import {
  verificationColumns,
} from "./VerificationColumns";

import "./Verification.css";

function Verification() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  useEffect(() => {

    loadUsers();

  }, []);

  async function loadUsers() {

    try {

      setLoading(true);

      const data =
        await getVerificationRequests();

      setUsers(data);

    } finally {

      setLoading(false);

    }

  }

  /* ==========================================
      FILTER USERS
  ========================================== */

  const filteredUsers = users.filter((user) => {

    const keyword =
      search.toLowerCase();

    const matchesSearch =

      user.name
        ?.toLowerCase()
        .includes(keyword)

      ||

      user.phoneNumber
        ?.toLowerCase()
        .includes(keyword)

      ||

      user.city
        ?.toLowerCase()
        .includes(keyword);

    const status =
      (
        user.verification?.verificationStatus ||
        "not_verified"
      ).toLowerCase();

    let matchesStatus = true;

    switch (statusFilter) {

      case "pending":

        matchesStatus =
          status === "pending";

        break;

      case "verified":

        matchesStatus =
          user.isVerified === true;

        break;

      case "rejected":

        matchesStatus =
          status === "rejected";

        break;

      case "not_verified":

        matchesStatus =
          status === "not_verified";

        break;

      default:

        matchesStatus = true;

    }

    return matchesSearch && matchesStatus;

  });

  /* ==========================================
      SORT BY SUBMITTED DATE (NEWEST FIRST)
  ========================================== */

  const sortedUsers = [...filteredUsers].sort(
    (a, b) => {

      const aTime =
        a.verification?.submittedAt?.toMillis?.() || 0;

      const bTime =
        b.verification?.submittedAt?.toMillis?.() || 0;

      return bTime - aTime;

    }
  );

  const columns =
    verificationColumns({

      onView: (user) => {

        navigate(
          `/admin/verification/${user.documentId}`
        );

      },

    });

  return (

    <PageLayout
      title="Verification"
      subtitle="Review user verification requests."
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="all">
            All Status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="verified">
            Verified
          </option>

          <option value="rejected">
            Rejected
          </option>

          <option value="not_verified">
            Not Verified
          </option>

        </select>

      </div>

      <TableLayout

        title="Verification Requests"

        total={sortedUsers.length}

        columns={columns}

        data={sortedUsers}

        loading={loading}

        search={search}

        onSearch={setSearch}

        onRefresh={loadUsers}

        addLabel={null}

        emptyMessage="No verification requests."

      />

    </PageLayout>

  );

}

export default Verification;