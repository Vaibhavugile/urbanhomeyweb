import {
    collection,
    getDocs,
    doc,
    getDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";

export async function getReports(){

    try{

        const snapshot =
            await getDocs(
                collection(db,"reports")
            );

        const reports =
            await Promise.all(

                snapshot.docs.map(async(reportDoc)=>{

                    const report =
                        reportDoc.data();

                    let reporter={};

                    let reportedUser={};

                    if(report.reportedByUserId){

                        const reporterSnap =
                            await getDoc(
                                doc(
                                    db,
                                    "users",
                                    report.reportedByUserId
                                )
                            );

                        if(reporterSnap.exists()){

                            reporter =
                                reporterSnap.data();

                        }

                    }

                    if(report.reportedUserId){

                        const reportedSnap =
                            await getDoc(
                                doc(
                                    db,
                                    "users",
                                    report.reportedUserId
                                )
                            );

                        if(reportedSnap.exists()){

                            reportedUser =
                                reportedSnap.data();

                        }

                    }

                    return{

                        documentId:
                            reportDoc.id,

                        ...report,

                        reporter,

                        reportedUser,

                    };

                })

            );

        return reports;

    }

    catch(error){

        console.error(error);

        return[];

    }

}