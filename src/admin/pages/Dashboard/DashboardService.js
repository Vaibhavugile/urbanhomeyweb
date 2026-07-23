import {
  collection,
  collectionGroup,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../../firebase";

export async function getDashboardStats() {

  try {

    const [

      users,

      listings,

      flatmates,

      matches,

      reports,

      purchases,

      verifiedUsers,

      pendingVerifications,

    ] = await Promise.all([

      getCountFromServer(
        collection(db, "users")
      ),

      getCountFromServer(
        collectionGroup(
          db,
          "flatListings"
        )
      ),

      getCountFromServer(
        collectionGroup(
          db,
          "seekingFlatmateProfiles"
        )
      ),

      getCountFromServer(
        collection(db, "matches")
      ),

      getCountFromServer(
        collection(db, "reports")
      ),

      getCountFromServer(
        collectionGroup(
          db,
          "purchases"
        )
      ),

      getCountFromServer(

        query(

          collection(db, "users"),

          where(
            "isVerified",
            "==",
            true
          )

        )

      ),

      getCountFromServer(

        query(

          collection(db, "users"),

          where(
            "verification.verificationStatus",
            "==",
            "pending"
          )

        )

      ),

    ]);

    /* ==========================================================
       CALCULATE REVENUE
    ========================================================== */

    const purchaseSnapshot =
      await getDocs(
        collectionGroup(
          db,
          "purchases"
        )
      );

    let totalRevenue = 0;

    let basicPlans = 0;

    let standardPlans = 0;

    let premiumPlans = 0;

    purchaseSnapshot.forEach((doc) => {

      const purchase =
        doc.data();

      if (
        purchase.status !==
        "completed"
      ) return;

      switch (purchase.planId) {

        case "basic_plan":

          totalRevenue += 99;

          basicPlans++;

          break;

        case "standard_plan":

          totalRevenue += 199;

          standardPlans++;

          break;

        case "premium_plan":

          totalRevenue += 399;

          premiumPlans++;

          break;

        default:

          break;

      }

    });

    return {

      totalUsers:
        users.data().count,

      totalListings:
        listings.data().count,

      totalFlatmates:
        flatmates.data().count,

      totalMatches:
        matches.data().count,

      totalReports:
        reports.data().count,

      totalPayments:
        purchases.data().count,

      verifiedUsers:
        verifiedUsers.data().count,

      pendingVerifications:
        pendingVerifications.data().count,

      totalRevenue,

      basicPlans,

      standardPlans,

      premiumPlans,

    };

  }

  catch (error) {

    console.error(
      "Dashboard Error:",
      error
    );

    return {

      totalUsers: 0,

      totalListings: 0,

      totalFlatmates: 0,

      totalMatches: 0,

      totalReports: 0,

      totalPayments: 0,

      verifiedUsers: 0,

      pendingVerifications: 0,

      totalRevenue: 0,

      basicPlans: 0,

      standardPlans: 0,

      premiumPlans: 0,

    };

  }

}