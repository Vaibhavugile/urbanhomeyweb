import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";

/* ==========================================
    GET PROFILE IMAGES
========================================== */

export async function getProfileImages(
  status = "pending"
) {

  let q;

  if (status === "all") {

    q = query(

      collection(db, "users"),

      orderBy("createdAt", "desc"),

      limit(100)

    );

  } else {

    q = query(

      collection(db, "users"),

      where(
        "profileImageVerificationStatus",
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
    APPROVE PROFILE IMAGE
========================================== */

export async function approveProfileImage(
  user
) {

  const ref = doc(
    db,
    user.documentPath
  );

  await updateDoc(ref, {

    profilePhotoUrl:
      user.pendingProfileImageUrl,

    pendingProfileImageUrl: null,

    profileImageVerification: true,

    profileImageVerificationStatus:
      "approved",

    profileImageVerifiedAt:
      serverTimestamp(),

    lastUpdated:
      serverTimestamp(),

  });

}

/* ==========================================
    REJECT PROFILE IMAGE
========================================== */

export async function rejectProfileImage(
  user
) {

  const ref = doc(
    db,
    user.documentPath
  );

  await updateDoc(ref, {

    pendingProfileImageUrl: null,

    profileImageVerification: false,

    profileImageVerificationStatus:
      "rejected",

    profileImageRejectedAt:
      serverTimestamp(),

    lastUpdated:
      serverTimestamp(),

  });

}