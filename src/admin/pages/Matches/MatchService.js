import {
    collection,
    getDocs,
} from "firebase/firestore";

import { db } from "../../../firebase";

/* ==========================================================
   GET ALL MATCHES
========================================================== */

export async function getMatches(){

    try{

        const snapshot =
            await getDocs(
                collection(db,"matches")
            );

        return snapshot.docs.map((doc)=>({

            documentId:
                doc.id,

            ...doc.data(),

        }));

    }

    catch(error){

        console.error(
            "Error fetching matches:",
            error
        );

        return[];

    }

}