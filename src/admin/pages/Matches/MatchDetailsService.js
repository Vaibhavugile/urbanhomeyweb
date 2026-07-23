import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";

/* ==========================================================
   GET MATCH DETAILS
========================================================== */

export async function getMatchDetails(matchId){

    try{

        const snapshot =
            await getDoc(
                doc(db,"matches",matchId)
            );

        if(!snapshot.exists()){

            return null;

        }

        return{

            documentId:
                snapshot.id,

            ...snapshot.data(),

        };

    }

    catch(error){

        console.error(
            "Match Details Error:",
            error
        );

        return null;

    }

}