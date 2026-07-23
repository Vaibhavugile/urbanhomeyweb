import {
    collectionGroup,
    getDocs,
    doc,
    getDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";

export async function getPaymentById(paymentId){

    try{

        const snapshot = await getDocs(
            collectionGroup(db,"purchases")
        );

        const purchaseDoc =
            snapshot.docs.find(
                doc => doc.id === paymentId
            );

        if(!purchaseDoc){

            return null;

        }

        const purchase =
            purchaseDoc.data();

        const userId =
            purchaseDoc.ref.parent.parent?.id;

        const userSnap =
            await getDoc(
                doc(db,"users",userId)
            );

        const user =
            userSnap.exists()
                ? userSnap.data()
                : {};

        return{

            documentId:
                purchaseDoc.id,

            userId,

            ...purchase,

            user,

        };

    }

    catch(error){

        console.error(error);

        return null;

    }

}