import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../../../firebase";

/* ==========================================
    ADMIN LOGIN
========================================== */

export async function adminLogin(
  email,
  password
) {

  /* ==========================================
      FIREBASE LOGIN
  ========================================== */

  const credential =
    await signInWithEmailAndPassword(

      auth,

      email,

      password

    );

  const firebaseUser =
    credential.user;

  /* ==========================================
      CHECK ADMIN USER
  ========================================== */

  const adminRef =
    doc(
      db,
      "adminUsers",
      firebaseUser.uid
    );

  const adminSnap =
    await getDoc(adminRef);

  if (!adminSnap.exists()) {

    await signOut(auth);

    throw new Error(
      "You don't have permission to access the Admin Panel."
    );

  }

  const admin =
    adminSnap.data();

  /* ==========================================
      ACCOUNT STATUS
  ========================================== */

  if (!admin.active) {

    await signOut(auth);

    throw new Error(
      "Your administrator account has been disabled."
    );

  }

  /* ==========================================
      LOAD ROLE
  ========================================== */

  const roleRef =
    doc(
      db,
      "roles",
      admin.roleId
    );

  const roleSnap =
    await getDoc(roleRef);

  if (!roleSnap.exists()) {

    await signOut(auth);

    throw new Error(
      "Assigned role not found."
    );

  }

  const role =
    roleSnap.data();

  /* ==========================================
      UPDATE LAST LOGIN
  ========================================== */

  await updateDoc(

    adminRef,

    {

      lastLogin:
        serverTimestamp(),

    }

  );

  /* ==========================================
      SESSION
  ========================================== */

  const session = {

    uid:
      firebaseUser.uid,

    name:
      admin.name,

    email:
      firebaseUser.email,

    phoneNumber:
      admin.phoneNumber || "",

    profilePhotoUrl:
      admin.profilePhotoUrl || "",

    roleId:
      admin.roleId,

    roleName:
      role.name,

    permissions:
      role.permissions || {},

    active:
      admin.active,

  };

  localStorage.setItem(

    "adminSession",

    JSON.stringify(session)

  );

  return session;

}

/* ==========================================
    GET CURRENT ADMIN
========================================== */

export function getCurrentAdmin() {

  const session =
    localStorage.getItem(
      "adminSession"
    );

  if (!session) {

    return null;

  }

  return JSON.parse(session);

}

/* ==========================================
    LOGOUT
========================================== */

export async function adminLogout() {

  localStorage.removeItem(
    "adminSession"
  );

  await signOut(auth);

}