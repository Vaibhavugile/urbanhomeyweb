import React, {
  useEffect,
  useState,
} from "react";

import UserDetailsDrawer from "./UserDetailsDrawer";
import { getUserColumns } from "./UserColumns";

import PageLayout from "../../layout/PageLayout";
import TableLayout from "../../components/table/TableLayout";

import { userColumns } from "./UserColumns";
import { getUsers } from "./UserService";

import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
const [selectedUser, setSelectedUser] =
  useState(null);

const [drawerOpen, setDrawerOpen] =
  useState(false);
  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(keyword) ||
      user.phoneNumber?.toLowerCase().includes(keyword) ||
      user.city?.toLowerCase().includes(keyword)
    );
  });
  function handleViewUser(user) {
  setSelectedUser(user);
  setDrawerOpen(true);
}

  return (
    <PageLayout
      title="Users"
      subtitle="Manage all UrbanHomey users"
    >
      <TableLayout
        title="All Users"
        total={filteredUsers.length}
        columns={getUserColumns({
  onView: handleViewUser,
})}
        data={filteredUsers}
        loading={loading}
        search={search}
        onSearch={setSearch}
        onRefresh={loadUsers}
        addLabel="Add User"
        emptyMessage="No users found."
      />
      <UserDetailsDrawer
  open={drawerOpen}
  user={selectedUser}
  onClose={() => {
    setDrawerOpen(false);
    setSelectedUser(null);
  }}
/>
    </PageLayout>
  );
}

export default Users;