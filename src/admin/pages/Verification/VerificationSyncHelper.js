import {
  collection,
  getDocs,
  writeBatch,
} from "firebase/firestore";

import { db } from "../../../firebase";

/* ==========================================
   SYNC VERIFICATION STATUS
========================================== */

export async function syncVerificationStatus(
  uid,
  verificationStatus,
  isVerified
) {

  const batch = writeBatch(db);

  /* ---------------------------------------
      FLAT LISTINGS
  --------------------------------------- */

  const flatListingsSnapshot = await getDocs(
    collection(
      db,
      "users",
      uid,
      "flatListings"
    )
  );

  flatListingsSnapshot.forEach((listing) => {

    batch.update(listing.ref, {

      isVerified,

      "userProfile.isVerified":
        isVerified,

      "userProfile.verification.verificationStatus":
        verificationStatus,

    });

  });

  /* ---------------------------------------
      SEEKING FLATMATE PROFILES
  --------------------------------------- */

  const flatmateSnapshot = await getDocs(
    collection(
      db,
      "users",
      uid,
      "seekingFlatmateProfiles"
    )
  );

  flatmateSnapshot.forEach((profile) => {

    batch.update(profile.ref, {

      isVerified,

      "userProfile.isVerified":
        isVerified,

      "userProfile.verification.verificationStatus":
        verificationStatus,

    });

  });

  await batch.commit();

}