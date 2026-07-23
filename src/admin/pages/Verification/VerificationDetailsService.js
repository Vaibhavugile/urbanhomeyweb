import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";

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

    }
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

}