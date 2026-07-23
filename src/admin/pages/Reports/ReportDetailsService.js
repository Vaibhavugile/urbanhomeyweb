import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";

/* ==========================================================
   GET REPORT DETAILS
========================================================== */

export async function getReportDetails(reportId) {

  try {

    const reportSnap =
      await getDoc(
        doc(db, "reports", reportId)
      );

    if (!reportSnap.exists()) {

      return null;

    }

    const report = reportSnap.data();

    let reporter = {};

    let reportedUser = {};

    if (report.reportedByUserId) {

      const reporterSnap =
        await getDoc(
          doc(
            db,
            "users",
            report.reportedByUserId
          )
        );

      if (reporterSnap.exists()) {

        reporter = reporterSnap.data();

      }

    }

    if (report.reportedUserId) {

      const reportedSnap =
        await getDoc(
          doc(
            db,
            "users",
            report.reportedUserId
          )
        );

      if (reportedSnap.exists()) {

        reportedUser =
          reportedSnap.data();

      }

    }

    return {

      documentId: reportSnap.id,

      ...report,

      reporter,

      reportedUser,

    };

  }

  catch (error) {

    console.error(error);

    return null;

  }

}

/* ==========================================================
   UPDATE STATUS
========================================================== */

export async function updateReportStatus(
  reportId,
  status
) {

  await updateDoc(

    doc(db, "reports", reportId),

    {

      status,

      updatedAt: new Date(),

    }

  );

}