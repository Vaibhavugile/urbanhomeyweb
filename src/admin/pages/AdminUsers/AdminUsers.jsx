import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";
import TableLayout from "../../components/table/TableLayout";

import {
  getAdminUsers,
} from "./AdminUsersService";
import {
  removeAdminUser,
} from "./AdminUsersService";
import {
  adminUsersColumns,
} from "./AdminUsersColumns";

import "./AdminUsers.css";

function AdminUsers() {

  const navigate =
    useNavigate();

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadUsers();

  }, []);

  async function loadUsers() {

    try {

      setLoading(true);

      const data =
        await getAdminUsers();

      setUsers(data);

    } finally {

      setLoading(false);

    }

  }

  const filteredUsers =
    users.filter((user) => {

      const keyword =
        search.toLowerCase();

      return (

        user.name
          ?.toLowerCase()
          .includes(keyword)

        ||

        user.email
          ?.toLowerCase()
          .includes(keyword)

        ||

        user.roleName
          ?.toLowerCase()
          .includes(keyword)

      );

    });

 const columns =
  adminUsersColumns({

    onEdit:(user)=>{

      navigate(

        `/admin/admin-users/edit/${user.documentId}`,

        {

          state:{
            user,
          },

        }

      );

    },

    onRemove:async(user)=>{

      const confirmed =
        window.confirm(

          `Remove ${user.name} as admin?`

        );

      if(!confirmed)
        return;

      await removeAdminUser(
        user.documentId
      );

      loadUsers();

    },

  });

  return (

    <PageLayout

      title="Admin Users"

      subtitle="Assign roles to existing users."

    >

      <TableLayout

        title="Admin Users"

        total={filteredUsers.length}

        columns={columns}

        data={filteredUsers}

        loading={loading}

        search={search}

        onSearch={setSearch}

        onRefresh={loadUsers}

        onAdd={()=>

          navigate(
            "/admin/admin-users/add"
          )

        }

        addLabel="Assign Role"

        emptyMessage="No admin users."

      />

    </PageLayout>

  );

}

export default AdminUsers;