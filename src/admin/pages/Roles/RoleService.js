import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";

/* ==========================================
    GET ALL ROLES
========================================== */

export async function getRoles() {

  const q = query(

    collection(db, "roles"),

    orderBy("createdAt", "desc"),

    limit(100)

  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((snapshotDoc) => ({

    documentId: snapshotDoc.id,

    ...snapshotDoc.data(),

  }));

}

/* ==========================================
    CREATE ROLE
========================================== */

export async function createRole({

  roleName,

  description,

  permissions,

}) {

  const documentId = roleName

    .trim()

    .toLowerCase()

    .replace(/\s+/g, "_");

  await setDoc(

    doc(
      db,
      "roles",
      documentId
    ),

    {

      name: roleName,

      description,

      active: true,

      permissions,

      createdAt:
        serverTimestamp(),

      updatedAt:
        serverTimestamp(),

    }

  );

}

/* ==========================================
    UPDATE ROLE
========================================== */

export async function updateRole(

  documentId,

  {

    roleName,

    description,

    permissions,

  }

) {

  await updateDoc(

    doc(
      db,
      "roles",
      documentId
    ),

    {

      name: roleName,

      description,

      permissions,

      updatedAt:
        serverTimestamp(),

    }

  );

}