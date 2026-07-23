import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../../firebase";

export async function getVerificationRequests() {

  try {

    const snapshot = await getDocs(
      collection(db, "users")
    );

    return snapshot.docs
      .map((doc) => ({

        documentId: doc.id,

        ...doc.data(),

      }))
      .filter(
        (user) => user.verification
      );

  } catch (error) {

    console.error(
      "Verification Error:",
      error
    );

    return [];

  }

}