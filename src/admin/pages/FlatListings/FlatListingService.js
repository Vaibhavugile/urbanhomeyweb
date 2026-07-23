import {
  collectionGroup,
  getDocs,
} from "firebase/firestore";

import { db } from "../../../firebase";

export async function getFlatListings() {
  try {
    const snapshot = await getDocs(
      collectionGroup(db, "flatListings")
    );

    return snapshot.docs.map((doc) => ({
      ...doc.data(),

      // Firestore Listing Document ID
      documentId: doc.id,

      // User UID
      uid: doc.ref.parent.parent.id,

      // Full Firestore Path
      documentPath: doc.ref.path,

      // Document Reference (useful later for delete)
      docRef: doc.ref,
    }));
  } catch (error) {
    console.error(
      "Error loading flat listings:",
      error
    );

    return [];
  }
}