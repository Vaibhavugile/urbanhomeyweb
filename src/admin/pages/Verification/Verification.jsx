import React,{
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

function Verification(){

  const navigate =
      useNavigate();

  const [users,setUsers] =
      useState([]);

  const [loading,setLoading] =
      useState(true);

  const [search,setSearch] =
      useState("");
const [statusFilter, setStatusFilter] =
    useState("all");
  useEffect(()=>{

      loadUsers();

  },[]);

  async function loadUsers(){

      try{

          setLoading(true);

          const data =
              await getVerificationRequests();

          setUsers(data);

      }

      finally{

          setLoading(false);

      }

  }

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
        (user.verificationStatus || "")
            .toLowerCase();

    let matchesStatus = true;

    switch(statusFilter){

        case "pending":

            matchesStatus =
                status === "pending";

            break;

        case "verified":

            matchesStatus =
                user.isVerified;

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

  const columns =
      verificationColumns({

          onView:(user)=>{

              navigate(
                  `/admin/verification/${user.documentId}`
              );

          },

      });

  return(

      <PageLayout

          title="Verification"

          subtitle="Review user verification requests."

      >

          <TableLayout

              title="Verification Requests"

              total={filteredUsers.length}

              columns={columns}

              data={filteredUsers}

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