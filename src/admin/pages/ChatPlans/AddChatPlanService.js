import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";

/* ==========================================================
   GET SINGLE PLAN
========================================================== */

export async function getChatPlan(planId) {

  try {

    const snapshot = await getDoc(

      doc(
        db,
        "chatPlans",
        planId
      )

    );

    if (!snapshot.exists()) {

      return null;

    }

    return {

      documentId: snapshot.id,

      ...snapshot.data(),

    };

  }

  catch (error) {

    console.error(

      "Get Plan Error:",

      error

    );

    return null;

  }

}

/* ==========================================================
   CREATE / UPDATE PLAN
========================================================== */

export async function saveChatPlan(

  planId,

  form,

  isEdit

) {

  try {

    const productId =
      form.productId.trim();

    const data = {

      title:
        form.title.trim(),

      badge:
        form.badge.trim(),

      contacts:
        Number(form.contacts),

      productId,

      sortOrder:
        Number(form.sortOrder),

      isActive:
        form.isActive,

      isHighlighted:
        form.isHighlighted,

      features:

        form.features.filter(

          (feature) =>

            feature.trim() !== ""

        ),

      updatedAt:
        serverTimestamp(),

    };

    /* ==========================================
       UPDATE
    ========================================== */

    if (isEdit) {

      await setDoc(

        doc(
          db,
          "chatPlans",
          planId
        ),

        data,

        {

          merge: true,

        }

      );

      return;

    }

    /* ==========================================
       CREATE
    ========================================== */

    const existingPlan =
      await getDoc(

        doc(
          db,
          "chatPlans",
          productId
        )

      );

    if (existingPlan.exists()) {

      throw new Error(

        "A plan with this Product ID already exists."

      );

    }

    await setDoc(

      doc(
        db,
        "chatPlans",
        productId
      ),

      {

        ...data,

        createdAt:
          serverTimestamp(),

      }

    );

  }

  catch (error) {

    console.error(

      "Save Plan Error:",

      error

    );

    throw error;

  }

}