import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";
import TableLayout from "../../components/table/TableLayout";

import {
  getFlatmateProfiles,
} from "./FlatmateListingService";

import {
  flatmateColumns,
} from "./FlatmateListingColumns";

import "./FlatmateListings.css";

function FlatmateListings() {
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProfiles();
  }, []);

  async function loadProfiles() {
    try {
      setLoading(true);

      const data =
        await getFlatmateProfiles();

      setProfiles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProfiles = profiles.filter(
    (profile) => {
      const keyword =
        search.toLowerCase();

      return (
        profile.userProfile?.name
          ?.toLowerCase()
          .includes(keyword) ||

        profile.locationName
          ?.toLowerCase()
          .includes(keyword) ||

        profile.city
          ?.toLowerCase()
          .includes(keyword) ||

        profile.userProfile?.occupation
          ?.toLowerCase()
          .includes(keyword)
      );
    }
  );

  const columns = flatmateColumns({
    onView: (profile) => {
      console.log("Clicked Profile:", profile);
      console.log("UID:", profile.uid);
      console.log(
        "Document ID:",
        profile.documentId
      );

      navigate(
        `/admin/flatmates/${profile.uid}/${profile.documentId}`
      );
    },

    onEdit: (profile) => {
      console.log("Edit Profile:", profile);
    },

    onDelete: (profile) => {
      console.log("Delete Profile:", profile);
    },
  });

  return (
    <PageLayout
      title="Flatmate Profiles"
      subtitle="Manage users looking for flatmates."
    >
      <TableLayout
        title="All Flatmate Profiles"
        total={filteredProfiles.length}
        columns={columns}
        data={filteredProfiles}
        loading={loading}
        search={search}
        onSearch={setSearch}
        onRefresh={loadProfiles}
        addLabel="Add Profile"
        emptyMessage="No flatmate profiles found."
      />
    </PageLayout>
  );
}

export default FlatmateListings;