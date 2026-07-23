import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../../firebase";

/**
 * Get all flat listings of a user
 */
export async function getUserListings(uid) {
  try {
    const q = query(
      collection(
        db,
        "users",
        uid,
        "flatListings"
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
      "Error fetching user listings:",
      error
    );

    return [];
  }
}