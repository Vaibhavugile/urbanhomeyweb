import {
  collectionGroup,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";

export async function getPayments() {

  try {

    const snapshot = await getDocs(
      collectionGroup(db, "purchases")
    );

    const payments = await Promise.all(

      snapshot.docs.map(async (purchaseDoc) => {

        const purchase = purchaseDoc.data();

        const userId =
          purchaseDoc.ref.parent.parent?.id;

        let userName = "-";
        let userPhone = "-";
        let userPhoto = "";
        let userType = "";

        if (userId) {

          try {

            const userSnap = await getDoc(
              doc(db, "users", userId)
            );

            if (userSnap.exists()) {

              const user =
                userSnap.data();

              userName =
                user.name || "-";

              userPhone =
                user.phoneNumber || "-";

              userPhoto =
                user.profilePhotoUrl || "";

              userType =
                user.userType || "";

            }

          } catch (e) {

            console.error(
              "User Fetch Error:",
              e
            );

          }

        }

        return {

          documentId:
            purchaseDoc.id,

          userId,

          userName,

          userPhone,

          userPhoto,

          userType,

          ...purchase,

        };

      })

    );

    return payments;

  } catch (error) {

    console.error(
      "Payments Error:",
      error
    );

    return [];

  }

}