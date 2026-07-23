import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";

/* ==========================================
   GET USER DETAILS
========================================== */

export async function getVerificationDetails(uid) {
  try {
    const snapshot = await getDoc(
      doc(db, "users", uid)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      documentId: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* ==========================================
   SYNC VERIFICATION STATUS
========================================== */

async function syncVerificationStatus(
  uid,
  verificationStatus,
  isVerified
) {
  const batch = writeBatch(db);

  /* ---------------------------------------
      FLAT LISTINGS
  --------------------------------------- */

  const listingsSnapshot = await getDocs(
    collection(
      db,
      "users",
      uid,
      "flatListings"
    )
  );

  listingsSnapshot.forEach((listing) => {
    batch.update(listing.ref, {
      isVerified: isVerified,

      "userProfile.isVerified": isVerified,

      "userProfile.verification.verificationStatus":
        verificationStatus,

      "userProfile.verification.reviewedAt":
        serverTimestamp(),

      "userProfile.verification.rejectedReason":
        verificationStatus === "rejected"
          ? ""
          : "",
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
      isVerified: isVerified,

      "userProfile.isVerified": isVerified,

      "userProfile.verification.verificationStatus":
        verificationStatus,

      "userProfile.verification.reviewedAt":
        serverTimestamp(),

      "userProfile.verification.rejectedReason":
        verificationStatus === "rejected"
          ? ""
          : "",
    });
  });

  await batch.commit();
}

/* ==========================================
   APPROVE
========================================== */

export async function approveVerification(uid) {
  await updateDoc(
    doc(db, "users", uid),
    {
      isVerified: true,

      "verification.verificationStatus":
        "approved",

      "verification.reviewedAt":
        serverTimestamp(),

      "verification.rejectedReason":
        "",
    }
  );

  await syncVerificationStatus(
    uid,
    "approved",
    true
  );
}

/* ==========================================
   REJECT
========================================== */

export async function rejectVerification(
  uid,
  reason = ""
) {
  await updateDoc(
    doc(db, "users", uid),
    {
      isVerified: false,

      "verification.verificationStatus":
        "rejected",

      "verification.rejectedReason":
        reason,

      "verification.reviewedAt":
        serverTimestamp(),
    }
  );

  await syncVerificationStatus(
    uid,
    "rejected",
    false
  );
}