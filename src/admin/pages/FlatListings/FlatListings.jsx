import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";
import TableLayout from "../../components/table/TableLayout";

import { getFlatListings } from "./FlatListingService";
import { flatListingColumns } from "./FlatListingColumns";

// import FlatListingDrawer from "./FlatListingDrawer";

import "./FlatListings.css";

function FlatListings() {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedListing, setSelectedListing] =
    useState(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  useEffect(() => {
    loadListings();
  }, []);

  async function loadListings() {
    try {
      setLoading(true);

      const data = await getFlatListings();

      setListings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const filteredListings = listings.filter(
    (listing) => {
      const keyword = search.toLowerCase();

      return (
        listing.userProfile?.name
          ?.toLowerCase()
          .includes(keyword) ||

        listing.locationName
          ?.toLowerCase()
          .includes(keyword) ||

        listing.city
          ?.toLowerCase()
          .includes(keyword) ||

        listing.flatType
          ?.toLowerCase()
          .includes(keyword)
      );
    }
  );

  const columns = flatListingColumns({
    onView: (listing) => {
      console.log("Clicked Listing:", listing);
      console.log("UID:", listing.uid);
      console.log("Document ID:", listing.documentId);

      navigate(
        `/admin/listings/${listing.uid}/${listing.documentId}`
      );
    },

    onEdit: (listing) => {
      console.log("Edit Listing:", listing);
    },

    onDelete: (listing) => {
      console.log("Delete Listing:", listing);
    },
  });

  return (
    <>
      <PageLayout
        title="Flat Listings"
        subtitle="Manage every property listed on UrbanHomey."
      >
        <TableLayout
          title="All Flat Listings"
          total={filteredListings.length}
          columns={columns}
          data={filteredListings}
          loading={loading}
          search={search}
          onSearch={setSearch}
          onRefresh={loadListings}
          addLabel="Add Listing"
          emptyMessage="No listings found."
        />
      </PageLayout>

      {/* <FlatListingDrawer
        open={drawerOpen}
        listing={selectedListing}
        onClose={() => setDrawerOpen(false)}
      /> */}
    </>
  );
}

export default FlatListings;