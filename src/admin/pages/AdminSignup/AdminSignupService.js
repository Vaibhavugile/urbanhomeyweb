import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../../../firebase";

/* ==========================================
    CREATE SUPER ADMIN
========================================== */

export async function createSuperAdmin({

  fullName,

  username,

  email,

  password,

}) {

  /* ==========================================
      CREATE FIREBASE USER
  ========================================== */

  const credential =
    await createUserWithEmailAndPassword(

      auth,

      email,

      password

    );

  const uid =
    credential.user.uid;

  /* ==========================================
      CREATE DEFAULT ROLE
  ========================================== */

  const roleRef =
    doc(
      db,
      "roles",
      "super_admin"
    );

  const roleSnap =
    await getDoc(roleRef);

  if (!roleSnap.exists()) {

    await setDoc(

      roleRef,

      {

        name:
          "Super Admin",

        description:
          "Full system access.",

        active: true,

        permissions: {

          dashboard: true,

          users: true,

          listings: true,

          flatmates: true,

          verification: true,

          listingImages: true,

          profileImages: true,

          reports: true,

          payments: true,

          matches: true,

          plans: true,

          roles: true,

          adminUsers: true,

          support: true,

          settings: true,

        },

        createdAt:
          serverTimestamp(),

      }

    );

  }

  /* ==========================================
      CREATE ADMIN USER
  ========================================== */

  await setDoc(

    doc(
      db,
      "adminUsers",
      uid
    ),

    {

      userId:
        uid,

      name:
        fullName,

      username,

      email,

      phoneNumber: "",

      city: "",

      profilePhotoUrl: "",

      roleId:
        "super_admin",

      active: true,

      assignedBy:
        "system",

      assignedAt:
        serverTimestamp(),

      updatedAt:
        serverTimestamp(),

      lastLogin:
        null,

    }

  );

  return uid;

}