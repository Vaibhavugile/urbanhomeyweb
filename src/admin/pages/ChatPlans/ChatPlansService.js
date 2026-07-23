import {
    collection,
    getDocs,
} from "firebase/firestore";

import { db } from "../../../firebase";

/* ==========================================================
   GET CHAT PLANS
========================================================== */

export async function getChatPlans(){

    try{

        const snapshot =
            await getDocs(
                collection(
                    db,
                    "chatPlans"
                )
            );

        return snapshot.docs

            .map((doc)=>({

                documentId:
                    doc.id,

                ...doc.data(),

            }))

            .sort(

                (a,b)=>

                    (a.sortOrder ?? 0)

                    -

                    (b.sortOrder ?? 0)

            );

    }

    catch(error){

        console.error(

            "Chat Plans Error:",

            error

        );

        return[];

    }

}