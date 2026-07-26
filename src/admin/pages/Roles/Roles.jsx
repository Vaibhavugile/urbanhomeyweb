import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";
import TableLayout from "../../components/table/TableLayout";

import {
  getRoles,
} from "./RoleService";

import {
  roleColumns,
} from "./RoleColumns";

import "./Roles.css";

function Roles() {

  const navigate = useNavigate();

  const [roles, setRoles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadRoles();

  }, []);

  async function loadRoles() {

    try {

      setLoading(true);

      const data =
        await getRoles();

      setRoles(data);

    } finally {

      setLoading(false);

    }

  }

  const filteredRoles =
    roles.filter((role) => {

      const keyword =
        search.toLowerCase();

      return (

        role.name
          ?.toLowerCase()
          .includes(keyword)

        ||

        role.description
          ?.toLowerCase()
          .includes(keyword)

      );

    });

  const columns =
    roleColumns({

      onView:(role)=>{

        navigate(
          `/admin/roles/edit/${role.documentId}`,
          {
            state:{
              role,
            },
          }
        );

      },

    });

  return (

    <PageLayout

      title="Roles"

      subtitle="Manage administrator roles and permissions."

    >

      <TableLayout

        title="Roles"

        total={filteredRoles.length}

        columns={columns}

        data={filteredRoles}

        loading={loading}

        search={search}

        onSearch={setSearch}

        onRefresh={loadRoles}

        onAdd={()=>
          navigate(
            "/admin/roles/add"
          )
        }

        addLabel="Add Role"

        emptyMessage="No roles found."

      />

    </PageLayout>

  );

}

export default Roles;