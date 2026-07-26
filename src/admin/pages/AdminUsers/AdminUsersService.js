import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";


import { db , auth} from "../../../firebase";

/* ==========================================
    GET ADMIN USERS
========================================== */

export async function getAdminUsers() {

  const snapshot = await getDocs(

    query(

      collection(db, "adminUsers"),

      orderBy("assignedAt", "desc"),

      limit(100)

    )

  );

  const rolesSnapshot = await getDocs(
    collection(db, "roles")
  );

  const roleMap = {};

  rolesSnapshot.forEach((doc) => {

    roleMap[doc.id] = doc.data().name;

  });

  const users = await Promise.all(

    snapshot.docs.map(async (adminDoc) => {

      const admin = adminDoc.data();

      const userSnap = await getDoc(

        doc(db, "users", admin.userId)

      );

      const user =

        userSnap.exists()

          ? userSnap.data()

          : {};

      return {

        documentId: adminDoc.id,

        ...admin,

        ...user,

        roleName:

          roleMap[admin.roleId] ||

          admin.roleId,

      };

    })

  );

  return users;

}

/* ==========================================
    SEARCH USERS
========================================== */

/* ==========================================
    SEARCH USERS
========================================== */

export async function searchUsers(keyword = "") {

  const snapshot = await getDocs(

    query(

      collection(db, "users"),

      limit(50)

    )

  );

  const users = snapshot.docs.map((doc) => ({

    uid: doc.id,

    ...doc.data(),

  }));

  if (!keyword.trim()) {

    return users;

  }

  const search =
    keyword.toLowerCase();

  return users.filter((user) => (

    user.name
      ?.toLowerCase()
      .includes(search)

    ||

    user.phoneNumber
      ?.toLowerCase()
      .includes(search)

    ||

    user.email
      ?.toLowerCase()
      .includes(search)

  ));

}

/* ==========================================
    ROLES DROPDOWN
========================================== */

export async function getRolesForDropdown() {

  const snapshot = await getDocs(

    query(

      collection(db, "roles"),

      where("active", "==", true),

      orderBy("name")

    )

  );

  return snapshot.docs.map((doc) => ({

    documentId: doc.id,

    ...doc.data(),

  }));

}

/* ==========================================
    ASSIGN ROLE
========================================== */

/* ==========================================
    ASSIGN ADMIN ROLE
========================================== */

export async function assignAdminRole({

  user,

  roleId,

  active,

}) {

  await setDoc(

    doc(
      db,
      "adminUsers",
      user.uid
    ),

    {

      userId: user.uid,

      roleId,

      active,

      name:
        user.name || "",

      phoneNumber:
        user.phoneNumber || "",

      email:
        user.email || "",

      city:
        user.city || "",

      profilePhotoUrl:
        user.profilePhotoUrl || "",

      assignedBy:
        "super_admin",

      assignedAt:
        serverTimestamp(),

      updatedAt:
        serverTimestamp(),

    }

  );

}

/* ==========================================
    UPDATE ROLE
========================================== */

/* ==========================================
    UPDATE ADMIN ROLE
========================================== */

export async function updateAdminRole(

  userId,

  {

    roleId,

    active,

  }

) {

  await updateDoc(

    doc(
      db,
      "adminUsers",
      userId
    ),

    {

      roleId,

      active,

      updatedAt:
        serverTimestamp(),

    }

  );

}
/* ==========================================
    CHECK ADMIN USER
========================================== */

export async function isAlreadyAdmin(
  userId
) {

  const snapshot =
    await getDoc(

      doc(
        db,
        "adminUsers",
        userId
      )

    );

  return snapshot.exists();

}
/* ==========================================
    REMOVE ADMIN
========================================== */

export async function removeAdminUser(
  userId
){

  await deleteDoc(

    doc(
      db,
      "adminUsers",
      userId
    )

  );

}
/* ==========================================
    CREATE ADMIN USER
========================================== */

export async function createAdminUser({

  fullName,

  username,

  email,

  password,

  phoneNumber,

  city,

  profilePhotoUrl,

  roleId,

  active,

}) {

  const credential =
    await createUserWithEmailAndPassword(

      auth,

      email,

      password

    );

  const uid =
    credential.user.uid;

  await setDoc(

    doc(
      db,
      "adminUsers",
      uid
    ),

    {

      userId: uid,

      name: fullName,

      username,

      email,

      phoneNumber,

      city,

      profilePhotoUrl,

      roleId,

      active,

      assignedBy:
        "super_admin",

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
/* ==========================================
    UPDATE ADMIN USER
========================================== */

export async function updateAdminUser(

  userId,

  data

) {

  await updateDoc(

    doc(
      db,
      "adminUsers",
      userId
    ),

    {

      name:
        data.fullName,

      username:
        data.username,

      phoneNumber:
        data.phoneNumber,

      city:
        data.city,

      profilePhotoUrl:
        data.profilePhotoUrl,

      roleId:
        data.roleId,

      active:
        data.active,

      updatedAt:
        serverTimestamp(),

    }

  );

}