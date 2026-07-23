import {
  collectionGroup,
  getDocs,
} from "firebase/firestore";

import { db } from "../../../firebase";

export async function getFlatmateProfiles() {

  try {

    const snapshot = await getDocs(
      collectionGroup(db, "seekingFlatmateProfiles")
    );

    return snapshot.docs.map((doc) => ({

      documentId: doc.id,

      ...doc.data(),

    }));

  } catch (error) {

    console.error(
      "Error loading flatmate profiles:",
      error
    );

    return [];

  }

}