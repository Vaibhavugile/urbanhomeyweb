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

import {
  deleteStorageFolder,
} from "../../services/StorageDeleteHelpers";

export async function getFlatListingById(
  uid,
  listingId
) {
  try {
    const docRef = doc(
      db,
      "users",
      uid,
      "flatListings",
      listingId
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
      "Error loading listing:",
      error
    );

    return null;
  }
}

export async function deleteFlatListing(
  uid,
  listingId
) {
  try {
    console.log(
      "===================================="
    );
    console.log(
      "Deleting Listing:",
      listingId
    );

    // 1. Delete Likes
    await deleteLikes(listingId);

    // 2. Delete Matches
    const chatRoomIds =
      await deleteMatches(listingId);

    // 3. Delete Chats
    await deleteChats(chatRoomIds);

    // 4. Delete Storage Images
    await deleteStorageFolder(
      `flat_images/${uid}`
    );

    // 5. Delete Listing Document
    const listingRef = doc(
      db,
      "users",
      uid,
      "flatListings",
      listingId
    );

    await deleteDocument(listingRef);

    console.log(
      "Listing deleted successfully."
    );

    return {
      success: true,
      message:
        "Listing deleted successfully.",
    };
  } catch (error) {
    console.error(
      "Delete Listing Error:",
      error
    );

    return {
      success: false,
      message:
        error.message ||
        "Failed to delete listing.",
    };
  }
}