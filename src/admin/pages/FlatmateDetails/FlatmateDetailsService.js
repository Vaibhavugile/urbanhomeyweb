import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";

import {
  deleteDocument,
  deleteLikes,
  deleteMatches,
  deleteChats,
} from "../../services/FirestoreDeleteHelpers";

export async function getFlatmateProfileById(
  uid,
  profileId
) {
  try {
    const docRef = doc(
      db,
      "users",
      uid,
      "seekingFlatmateProfiles",
      profileId
    );

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      documentId: snapshot.id,
      uid,
      docRef,
      documentPath: docRef.path,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error(
      "Error loading flatmate profile:",
      error
    );

    return null;
  }
}

export async function deleteFlatmateProfile(
  uid,
  profileId
) {
  try {
    console.log(
      "===================================="
    );
    console.log(
      "Deleting Flatmate Profile:",
      profileId
    );

    // 1. Delete Likes
    await deleteLikes(profileId);

    // 2. Delete Matches
    const chatRoomIds =
      await deleteMatches(profileId);

    // 3. Delete Chats
    await deleteChats(chatRoomIds);

    // 4. Delete Profile Document
    const profileRef = doc(
      db,
      "users",
      uid,
      "seekingFlatmateProfiles",
      profileId
    );

    await deleteDocument(profileRef);

    console.log(
      "Flatmate profile deleted successfully."
    );

    return {
      success: true,
      message:
        "Flatmate profile deleted successfully.",
    };
  } catch (error) {
    console.error(
      "Delete Flatmate Profile Error:",
      error
    );

    return {
      success: false,
      message:
        error.message ||
        "Failed to delete flatmate profile.",
    };
  }
}