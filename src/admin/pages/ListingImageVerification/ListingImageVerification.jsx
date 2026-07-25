import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";
import TableLayout from "../../components/table/TableLayout";

import {
  getListingImages,
} from "./ListingImageVerificationService";

import {
  listingImageVerificationColumns,
} from "./ListingImageVerificationColumns";

import "./ListingImageVerification.css";

function ListingImageVerification() {

  const navigate = useNavigate();

  const [listings, setListings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("pending");

  useEffect(() => {

    loadListings();

  }, [statusFilter]);

  /* ==========================================
      LOAD LISTINGS
  ========================================== */

  async function loadListings() {

    try {

      setLoading(true);

      const data =
        await getListingImages(
          statusFilter
        );

      setListings(data);

    } catch (e) {

      console.error(e);

    } finally {

      setLoading(false);

    }

  }

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredListings =
    listings.filter((listing) => {

      const keyword =
        search.toLowerCase();

      return (

        listing.userProfile?.name
          ?.toLowerCase()
          .includes(keyword)

        ||

        listing.flatType
          ?.toLowerCase()
          .includes(keyword)

        ||

        listing.roomType
          ?.toLowerCase()
          .includes(keyword)

        ||

        listing.city
          ?.toLowerCase()
          .includes(keyword)

        ||

        listing.locationName
          ?.toLowerCase()
          .includes(keyword)

      );

    });

  /* ==========================================
      TABLE COLUMNS
  ========================================== */

  const columns =
    listingImageVerificationColumns({

      onView: (listing) => {

        navigate(

          `/admin/listing-image-verification/${listing.documentId}`,

          {

            state: {

              listing,

            },

          }

        );

      },

    });

  return (

    <PageLayout
      title="Listing Image Verification"
      subtitle="Review listing images submitted by users."
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

        title={`Listing Images (${statusFilter})`}

        total={filteredListings.length}

        columns={columns}

        data={filteredListings}

        loading={loading}

        search={search}

        onSearch={setSearch}

        onRefresh={loadListings}

        addLabel={null}

        emptyMessage={`No ${statusFilter} listing images found.`}

      />

    </PageLayout>

  );

}

export default ListingImageVerification;