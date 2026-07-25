import {
  collectionGroup,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  documentId,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";

/* ==========================================
    GET LISTING IMAGES BY STATUS
========================================== */

export async function getListingImages(
  status = "pending"
) {

  let q;

  if (status === "all") {

    q = query(

      collectionGroup(db, "flatListings"),

      orderBy("createdAt", "desc"),

      limit(100)

    );

  } else {

    q = query(

      collectionGroup(db, "flatListings"),

      where(
        "imageVerificationStatus",
        "==",
        status
      ),

      orderBy("createdAt", "desc"),

      limit(100)

    );

  }

  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (snapshotDoc) => ({

      ...snapshotDoc.data(),

      documentId: snapshotDoc.id,

      documentPath:
        snapshotDoc.ref.path,

    })
  );

}

/* ==========================================
    GET SINGLE LISTING
========================================== */

export async function getListingById(id) {

  const q = query(

    collectionGroup(db, "flatListings"),

    where(documentId(), "==", id),

    limit(1)

  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {

    return null;

  }

  const snapshotDoc =
    snapshot.docs[0];

  return {

    ...snapshotDoc.data(),

    documentId:
      snapshotDoc.id,

    documentPath:
      snapshotDoc.ref.path,

  };

}

/* ==========================================
    APPROVE
========================================== */

export async function approveListingImages(
  listing
) {

  const ref = doc(
    db,
    listing.documentPath
  );

  await updateDoc(ref, {

    imageUrls:
      listing.pendingImageUrls || [],

    pendingImageUrls: [],

    imageVerification: true,

    imageVerificationStatus:
      "approved",

    imageVerifiedAt:
      serverTimestamp(),

    lastUpdated:
      serverTimestamp(),

  });

}

/* ==========================================
    REJECT
========================================== */

export async function rejectListingImages(
  listing
) {

  const ref = doc(
    db,
    listing.documentPath
  );

  await updateDoc(ref, {

    pendingImageUrls: [],

    imageVerification: false,

    imageVerificationStatus:
      "rejected",

    imageRejectedAt:
      serverTimestamp(),

    lastUpdated:
      serverTimestamp(),

  });

}