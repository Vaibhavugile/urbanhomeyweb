import {
  collectionGroup,
  getDocs,
} from "firebase/firestore";

import { db } from "../../../firebase";

export async function getFlatmateProfileById(profileId) {

  try {

    const snapshot = await getDocs(
      collectionGroup(db, "seekingFlatmateProfiles")
    );

    const doc = snapshot.docs.find(
      (item) => item.id === profileId
    );

    if (!doc) return null;

    return {

      documentId: doc.id,

      ...doc.data(),

    };

  } catch (error) {

    console.error(
      "Error loading flatmate profile:",
      error
    );

    return null;

  }

}