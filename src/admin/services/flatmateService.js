import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../../firebase";

/**
 * Get all flatmate profiles of a user
 */
export async function getUserFlatmateProfiles(uid) {
  try {
    const q = query(
      collection(
        db,
        "users",
        uid,
        "seekingFlatmateProfiles"
      ),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      documentId: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(
      "Error fetching flatmate profiles:",
      error
    );

    return [];
  }
}