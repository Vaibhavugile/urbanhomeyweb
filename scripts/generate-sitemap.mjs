import fs from "fs";
import path from "path";

import { initializeApp } from "firebase/app";

import {
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";

/*
 * IMPORTANT
 *
 * cities.js must export:
 *
 * export default cities;
 *
 * The imported object must already contain:
 *
 * 1. Main cities
 *
 *    pune
 *    mumbai
 *    delhi
 *    etc.
 *
 * 2. Automatically generated locations
 *
 *    wakad
 *    ravet
 *    hinjawadi
 *    powai
 *    andheri-west
 *    etc.
 */

import cities from "../src/data/cities.js";


/* =========================================================
   WEBSITE CONFIG
========================================================= */

const SITE_URL = "https://www.urbanhomey.com";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyALksl6qc-ht2ArInPE2xA-q_7b7MgjwjU",

  authDomain:
    "urbanhomey-363dc.firebaseapp.com",

  projectId:
    "urbanhomey-363dc",

  storageBucket:
    "urbanhomey-363dc.firebasestorage.app",

  messagingSenderId:
    "449162847594",

  appId:
    "1:449162847594:web:96365101b00730ac527113",

  measurementId:
    "G-09Z250TQ76",
};


/* =========================================================
   FIREBASE INITIALIZATION
========================================================= */

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


/* =========================================================
   STATIC PUBLIC ROUTES

   IMPORTANT

   Only add pages that:

   1. Are public.
   2. Return useful content.
   3. Should appear in Google.
   4. Do not require authentication.

========================================================= */

const STATIC_ROUTES = [

  {
    path: "/",
    changefreq: "daily",
    priority: "1.0",
  },


  {
    path: "/matches",
    changefreq: "daily",
    priority: "0.9",
  },


  {
    path: "/find-room",
    changefreq: "daily",
    priority: "0.9",
  },


  {
    path: "/list-room",
    changefreq: "weekly",
    priority: "0.8",
  },


  {
    path: "/cities",
    changefreq: "weekly",
    priority: "0.9",
  },


  {
    path: "/blogs",
    changefreq: "daily",
    priority: "0.9",
  },


  {
    path: "/download-app",
    changefreq: "monthly",
    priority: "0.7",
  },


  {
    path: "/about",
    changefreq: "monthly",
    priority: "0.6",
  },


  {
    path: "/contact",
    changefreq: "monthly",
    priority: "0.6",
  },


  {
    path: "/press",
    changefreq: "monthly",
    priority: "0.5",
  },


  {
    path: "/support",
    changefreq: "monthly",
    priority: "0.5",
  },


  {
    path: "/privacy",
    changefreq: "yearly",
    priority: "0.3",
  },


  {
    path: "/terms",
    changefreq: "yearly",
    priority: "0.3",
  },

];


/* =========================================================
   XML ESCAPE HELPER
========================================================= */

function escapeXml(value = "") {

  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&apos;");

}


/* =========================================================
   CURRENT DATE
========================================================= */

function getCurrentDate() {

  return new Date()

    .toISOString()

    .split("T")[0];

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(value) {

  if (!value) {
    return getCurrentDate();
  }


  /*
   * Firestore Timestamp.
   */

  if (
    typeof value === "object" &&
    typeof value.toDate === "function"
  ) {

    return value

      .toDate()

      .toISOString()

      .split("T")[0];

  }


  /*
   * Serialized Firestore Timestamp.
   */

  if (
    typeof value === "object" &&
    typeof value.seconds === "number"
  ) {

    return new Date(
      value.seconds * 1000
    )

      .toISOString()

      .split("T")[0];

  }


  /*
   * JavaScript Date / date string.
   */

  const parsedDate = new Date(value);


  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {

    return getCurrentDate();

  }


  return parsedDate

    .toISOString()

    .split("T")[0];

}


/* =========================================================
   NORMALIZE SLUG
========================================================= */

function normalizeSlug(value = "") {

  return String(value)

    .trim()

    .toLowerCase()

    .replace(/^\/+|\/+$/g, "");

}


/* =========================================================
   VALIDATE PRIORITY
========================================================= */

function normalizePriority(
  value,
  fallback = "0.7"
) {

  const parsed = Number(value);


  if (
    Number.isNaN(parsed) ||
    parsed < 0 ||
    parsed > 1
  ) {

    return fallback;

  }


  return parsed.toFixed(1);

}


/* =========================================================
   VALIDATE CHANGE FREQUENCY
========================================================= */

const VALID_CHANGE_FREQUENCIES =
  new Set([
    "always",
    "hourly",
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "never",
  ]);


function normalizeChangefreq(
  value,
  fallback = "weekly"
) {

  if (
    typeof value === "string" &&
    VALID_CHANGE_FREQUENCIES.has(value)
  ) {

    return value;

  }


  return fallback;

}


/* =========================================================
   CHECK WHETHER LOCATION IS INDEXABLE
========================================================= */

function isIndexableLocation(location) {

  if (
    !location ||
    typeof location !== "object"
  ) {
    return false;
  }


  const slug =
    normalizeSlug(location.slug);


  if (!slug) {
    return false;
  }


  /*
   * Explicit noindex support.
   */

  if (location.noindex === true) {
    return false;
  }


  /*
   * Draft support.
   */

  if (
    location.status &&
    location.status !== "published"
  ) {
    return false;
  }


  return true;

}


/* =========================================================
   GET LOCATION PRIORITY

   Main cities:
   0.9

   Generated locations:
   0.7

========================================================= */

function getLocationPriority(location) {

  if (location.priority !== undefined) {

    return normalizePriority(
      location.priority,
      "0.7"
    );

  }


  if (
    location.isGeneratedLocation === true
  ) {

    return "0.7";

  }


  return "0.9";

}


/* =========================================================
   GET LOCATION CHANGE FREQUENCY
========================================================= */

function getLocationChangefreq(location) {

  if (location.changefreq) {

    return normalizeChangefreq(
      location.changefreq,
      "weekly"
    );

  }


  return "weekly";

}


/* =========================================================
   GENERATE SITEMAP
========================================================= */

async function generateSitemap() {

  try {

    console.log("");

    console.log(
      "======================================"
    );

    console.log(
      "Generating UrbanHomey sitemap..."
    );

    console.log(
      "======================================"
    );

    console.log("");


    const currentDate =
      getCurrentDate();


    /* =====================================================
       VALIDATE CITIES OBJECT
    ===================================================== */

    if (
      !cities ||
      typeof cities !== "object" ||
      Array.isArray(cities)
    ) {

      throw new Error(
        "cities.js must default export the final cities object."
      );

    }


    /* =====================================================
       CONVERT CITIES OBJECT INTO ARRAY
    ===================================================== */

    const allLocations =
      Object.values(cities);


    const mainCities =
      allLocations.filter(
        (location) =>
          location.isGeneratedLocation !== true
      );


    const generatedLocations =
      allLocations.filter(
        (location) =>
          location.isGeneratedLocation === true
      );


    console.log(
      `Main cities found: ${mainCities.length}`
    );


    console.log(
      `Generated locations found: ${generatedLocations.length}`
    );


    console.log(
      `Total locations found: ${allLocations.length}`
    );


    /* =====================================================
       CREATE STATIC ROUTES
    ===================================================== */

    const staticRoutes =
      STATIC_ROUTES.map(
        (route) => ({

          ...route,

          lastmod:
            route.lastmod ||
            currentDate,

        })
      );


    /* =====================================================
       CREATE LOCATION ROUTES

       IMPORTANT

       Every object in the final cities object becomes:

       /city/:slug

    ===================================================== */

    const locationRoutes =
      allLocations

        .filter(
          isIndexableLocation
        )

        .map(
          (location) => {

            const slug =
              normalizeSlug(
                location.slug
              );


            return {

              path:
                `/city/${encodeURIComponent(
                  slug
                )}`,


              lastmod:
                formatDate(

                  location.updatedAt ||

                  location.modifiedAt ||

                  location.createdAt ||

                  currentDate

                ),


              changefreq:
                getLocationChangefreq(
                  location
                ),


              priority:
                getLocationPriority(
                  location
                ),

            };

          }
        );


    console.log(
      `Indexable location URLs: ${locationRoutes.length}`
    );


    /* =====================================================
       FETCH FIRESTORE BLOGS
    ===================================================== */

    const snapshot =
      await getDocs(

        collection(
          db,
          "blogs"
        )

      );


    console.log(
      `Firestore blogs found: ${snapshot.size}`
    );


    /* =====================================================
       CREATE BLOG ROUTES
    ===================================================== */

    const blogRoutes =
      snapshot.docs

        .map(
          (document) => ({

            id: document.id,

            ...document.data(),

          })
        )


        .filter(
          (blog) => {

            const hasSlug =
              typeof blog.slug === "string" &&

              normalizeSlug(
                blog.slug
              ).length > 0;


            const isPublished =

              !blog.status ||

              blog.status ===
                "published";


            const isIndexable =

              blog.noindex !== true;


            return (

              hasSlug &&

              isPublished &&

              isIndexable

            );

          }
        )


        .map(
          (blog) => ({

            path:
              `/blog/${encodeURIComponent(

                normalizeSlug(
                  blog.slug
                )

              )}`,


            lastmod:
              formatDate(

                blog.updatedAt ||

                blog.modifiedAt ||

                blog.publishedAt ||

                blog.createdAt

              ),


            changefreq:
              "monthly",


            priority:
              "0.7",

          })
        );


    console.log(
      `Indexable blog URLs: ${blogRoutes.length}`
    );


    /* =====================================================
       COMBINE ROUTES
    ===================================================== */

    const allRoutes = [

      ...staticRoutes,

      ...locationRoutes,

      ...blogRoutes,

    ];


    /* =====================================================
       REMOVE DUPLICATES

       This also protects against accidental duplicate
       location slugs.
    ===================================================== */

    const uniqueRoutes =
      Array.from(

        new Map(

          allRoutes.map(
            (route) => [

              route.path,

              route,

            ]
          )

        ).values()

      );


    /* =====================================================
       SORT ROUTES
    ===================================================== */

    uniqueRoutes.sort(
      (a, b) => {

        if (a.path === "/") {
          return -1;
        }


        if (b.path === "/") {
          return 1;
        }


        return a.path.localeCompare(
          b.path
        );

      }
    );


    /* =====================================================
       CREATE XML URL ENTRIES
    ===================================================== */

    const xmlUrls =
      uniqueRoutes

        .map(
          ({
            path: routePath,
            lastmod,
            changefreq,
            priority,
          }) => `  <url>
    <loc>${escapeXml(
      `${SITE_URL}${routePath}`
    )}</loc>
    <lastmod>${escapeXml(
      lastmod
    )}</lastmod>
    <changefreq>${escapeXml(
      changefreq
    )}</changefreq>
    <priority>${escapeXml(
      priority
    )}</priority>
  </url>`
        )

        .join("\n\n");


    /* =====================================================
       CREATE FINAL XML
    ===================================================== */

    const sitemap =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>
`;


    /* =====================================================
       ENSURE PUBLIC DIRECTORY EXISTS
    ===================================================== */

    const publicDirectory =
      path.resolve(
        process.cwd(),
        "public"
      );


    if (
      !fs.existsSync(
        publicDirectory
      )
    ) {

      fs.mkdirSync(
        publicDirectory,
        {
          recursive: true,
        }
      );

    }


    /* =====================================================
       WRITE SITEMAP
    ===================================================== */

    const outputPath =
      path.join(
        publicDirectory,
        "sitemap.xml"
      );


    fs.writeFileSync(
      outputPath,
      sitemap,
      "utf8"
    );


    /* =====================================================
       SUCCESS OUTPUT
    ===================================================== */

    console.log("");

    console.log(
      "======================================"
    );

    console.log(
      "Sitemap generated successfully."
    );


    console.log(
      `Static URLs: ${staticRoutes.length}`
    );


    console.log(
      `Main city entries: ${mainCities.length}`
    );


    console.log(
      `Generated location entries: ${generatedLocations.length}`
    );


    console.log(
      `Location URLs: ${locationRoutes.length}`
    );


    console.log(
      `Blog URLs: ${blogRoutes.length}`
    );


    console.log(
      `Total URLs before deduplication: ${allRoutes.length}`
    );


    console.log(
      `Total unique URLs: ${uniqueRoutes.length}`
    );


    console.log(
      `Output: ${outputPath}`
    );


    console.log(
      "======================================"
    );

    console.log("");


    process.exit(0);

  } catch (error) {

    console.error("");

    console.error(
      "======================================"
    );

    console.error(
      "SITEMAP GENERATION FAILED"
    );

    console.error(
      "======================================"
    );

    console.error(error);

    console.error("");


    process.exit(1);

  }

}


/* =========================================================
   RUN
========================================================= */

generateSitemap();