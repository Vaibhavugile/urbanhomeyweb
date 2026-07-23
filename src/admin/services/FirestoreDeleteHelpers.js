import {
  collectionGroup,
  deleteDoc,
  getDocs,
  query,
  where,
  collection,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase";

/* ===========================================
      DELETE SINGLE DOCUMENT
=========================================== */

export async function deleteDocument(docRef) {
  try {
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(
      "Delete document failed:",
      error
    );

    return false;
  }
}
/* ===========================================
      DELETE DOCUMENTS BY QUERY
=========================================== */

export async function deleteDocumentsByQuery(
  firestoreQuery
) {
  try {
    const snapshot = await getDocs(
      firestoreQuery
    );

    if (snapshot.empty) {
      return [];
    }

    const deletedDocs = [];

    const deletePromises = snapshot.docs.map(
      (doc) => {

        deletedDocs.push(doc.data());

        return deleteDoc(doc.ref);

      }
    );

    await Promise.all(deletePromises);

    return deletedDocs;

  } catch (error) {

    console.error(
      "Delete Query Error:",
      error
    );

    return [];

  }
}
/* ===========================================
      DELETE ALL LIKES
=========================================== */

export async function deleteLikes(
  profileId
) {
  try {

    const likesRef = collectionGroup(
      db,
      "likes"
    );

    await deleteDocumentsByQuery(
      query(
        likesRef,
        where(
          "likedProfileDocumentId",
          "==",
          profileId
        )
      )
    );

    await deleteDocumentsByQuery(
      query(
        likesRef,
        where(
          "likingUserProfileId",
          "==",
          profileId
        )
      )
    );

    console.log("Likes deleted");

    return true;

  } catch (error) {

    console.error(
      "Delete Likes Error:",
      error
    );

    return false;

  }
}
/* ===========================================
      DELETE MATCHES
=========================================== */

export async function deleteMatches(
  profileId
) {
  try {
    const matchesRef = collectionGroup(
      db,
      "matches"
    );

    const chatRoomIds = new Set();

    const user1Matches =
      await deleteDocumentsByQuery(
        query(
          matchesRef,
          where(
            "user1_profile_id",
            "==",
            profileId
          )
        )
      );

    user1Matches.forEach((match) => {
      if (match.chatRoomId) {
        chatRoomIds.add(match.chatRoomId);
      }
    });

    const user2Matches =
      await deleteDocumentsByQuery(
        query(
          matchesRef,
          where(
            "user2_profile_id",
            "==",
            profileId
          )
        )
      );

    user2Matches.forEach((match) => {
      if (match.chatRoomId) {
        chatRoomIds.add(match.chatRoomId);
      }
    });

    console.log(
      "Matches deleted"
    );

    return [...chatRoomIds];

  } catch (error) {

    console.error(
      "Delete Matches Error:",
      error
    );

    return [];
  }
}
/* ===========================================
      DELETE SUBCOLLECTION
=========================================== */

export async function deleteSubcollection(
  parentDocRef,
  subcollectionName
) {
  try {

    const subcollectionRef = collection(
      parentDocRef,
      subcollectionName
    );

    const snapshot = await getDocs(
      subcollectionRef
    );

    if (snapshot.empty) {
      return;
    }

    await Promise.all(
      snapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      )
    );

  } catch (error) {

    console.error(
      "Delete Subcollection Error:",
      error
    );

  }
}
/* ===========================================
      DELETE CHATS
=========================================== */

export async function deleteChats(chatRoomIds) {
  try {
    for (const chatRoomId of chatRoomIds) {

      const chatRef = doc(
        db,
        "chats",
        chatRoomId
      );

      // Delete all messages
      await deleteSubcollection(
        chatRef,
        "messages"
      );

      // Delete chat document
      await deleteDocument(chatRef);
    }

    console.log("Chats deleted");

    return true;

  } catch (error) {

    console.error(
      "Delete Chats Error:",
      error
    );

    return false;

  }
}