import {
  doc,
} from "firebase/firestore";

import { db } from "../../firebase";

import {
  deleteDocument,
   deleteLikes,
   deleteMatches,
     deleteChats,
} from "./FirestoreDeleteHelpers";
import {
  deleteStorageFolder,
} from "./StorageDeleteHelpers";
/* ===========================================
      DELETE FLAT LISTING
=========================================== */

export async function deleteFlatListing(
  uid,
  listingId
) {
  try {
    console.log(
      "Deleting Flat Listing:",
      listingId
    );

    /*
      STEP 1
      Delete Likes
    */
   await deleteLikes(listingId);

    /*
      STEP 2
      Delete Matches
    */
const chatRoomIds =
  await deleteMatches(listingId);
    /*
      STEP 3
      Delete Chats
    */
await deleteChats(chatRoomIds);
    /*
      STEP 4
      Delete Reports
    */

    /*
      STEP 5
      Delete Notifications
    */

    /*
      STEP 6
      Delete Storage Images
    */

     await deleteStorageFolder(
  `flat_images/${uid}`
);
    /*
      STEP 7
      Delete Listing Document
    */

    const listingRef = doc(
      db,
      "users",
      uid,
      "flatListings",
      listingId
    );

    await deleteDocument(listingRef);

    return true;

  } catch (error) {

    console.error(
      "Delete Listing Error:",
      error
    );

    return false;

  }
}