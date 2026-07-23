import { Helmet } from "react-helmet-async";

const SITE_NAME = "UrbanHomey";
const SITE_URL = "https://www.urbanhomey.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const DEFAULT_TITLE =
  "UrbanHomey | Find Verified Flatmates, Roommates, Rooms & Shared Flats";

const DEFAULT_DESCRIPTION =
  "Find verified flatmates, compatible roommates, shared flats, rooms for rent and rental listings across India with UrbanHomey. Match with students, working professionals and potential flatmates based on location, budget, lifestyle, habits and compatibility preferences.";

const DEFAULT_KEYWORDS = [
  // =========================
  // BRAND KEYWORDS
  // =========================

  "UrbanHomey",
  "Urban Homey",
  "UrbanHomey India",
  "UrbanHomey flatmate finder",
  "UrbanHomey roommate finder",
  "UrbanHomey rooms for rent",

  // =========================
  // PRIMARY FLATMATE KEYWORDS
  // =========================

  "flatmate finder",
  "flatmate finder India",
  "find flatmates",
  "find flatmates in India",
  "find a flatmate",
  "find compatible flatmates",
  "verified flatmates",
  "flatmate matching platform",
  "flatmate matching app",
  "flatmate search website",
  "flatmate search app",
  "flatmate website India",
  "flatmate app India",
  "best flatmate finder India",
  "online flatmate finder",
  "flatmates near me",
  "find flatmates near me",
  "compatible flatmates near me",

  // =========================
  // ROOMMATE KEYWORDS
  // =========================

  "roommate finder",
  "roommate finder India",
  "find roommates",
  "find roommates in India",
  "find a roommate",
  "find compatible roommates",
  "verified roommates",
  "roommate matching platform",
  "roommate matching app",
  "roommate search website",
  "roommate search app",
  "roommate website India",
  "roommate app India",
  "best roommate finder India",
  "online roommate finder",
  "roommates near me",
  "find roommates near me",
  "compatible roommates near me",

  // =========================
  // ROOM SEARCH KEYWORDS
  // =========================

  "rooms for rent",
  "rooms for rent in India",
  "room for rent",
  "find rooms for rent",
  "find room near me",
  "rooms near me",
  "rental rooms near me",
  "affordable rooms for rent",
  "budget rooms for rent",
  "private rooms for rent",
  "furnished rooms for rent",
  "semi furnished rooms for rent",
  "unfurnished rooms for rent",
  "rooms for students",
  "rooms for working professionals",
  "rooms for bachelors",
  "rooms for girls",
  "rooms for boys",
  "rooms for women",
  "rooms for men",

  // =========================
  // SHARED FLAT KEYWORDS
  // =========================

  "shared flats",
  "shared flats in India",
  "shared flats near me",
  "shared apartment",
  "shared apartments",
  "shared apartments near me",
  "shared accommodation",
  "shared accommodation India",
  "shared accommodation near me",
  "shared rooms",
  "shared rooms for rent",
  "shared rooms near me",
  "find shared flats",
  "find shared apartments",
  "find shared accommodation",
  "flat sharing",
  "apartment sharing",
  "house sharing India",

  // =========================
  // LIST ROOM / FLAT KEYWORDS
  // =========================

  "list room for rent",
  "list a room",
  "list my room",
  "post room for rent",
  "advertise room for rent",
  "find roommate for my flat",
  "find flatmate for my room",
  "find tenant for shared flat",
  "room listing website India",
  "flat listing website India",
  "shared flat listing website",

  // =========================
  // STUDENT KEYWORDS
  // =========================

  "student flatmates",
  "student roommates",
  "find student flatmates",
  "find student roommates",
  "rooms for college students",
  "rooms for university students",
  "student accommodation",
  "student accommodation India",
  "student housing",
  "student housing India",
  "shared accommodation for students",
  "affordable rooms for students",

  // =========================
  // WORKING PROFESSIONAL KEYWORDS
  // =========================

  "flatmates for working professionals",
  "roommates for working professionals",
  "rooms for working professionals",
  "shared flats for working professionals",
  "shared accommodation for professionals",
  "find professional flatmates",
  "find professional roommates",

  // =========================
  // COMPATIBILITY KEYWORDS
  // =========================

  "compatible flatmates",
  "compatible roommates",
  "lifestyle based flatmate matching",
  "lifestyle based roommate matching",
  "flatmate compatibility",
  "roommate compatibility",
  "flatmate matching by lifestyle",
  "roommate matching by lifestyle",
  "flatmate matching by habits",
  "roommate matching by habits",
  "flatmate matching by budget",
  "roommate matching by budget",
  "flatmate matching by location",
  "roommate matching by location",
  "smart flatmate matching",
  "smart roommate matching",

  // =========================
  // SAFETY / TRUST KEYWORDS
  // =========================

  "verified flatmate profiles",
  "verified roommate profiles",
  "safe flatmate finder",
  "safe roommate finder",
  "trusted flatmate finder",
  "trusted roommate finder",
  "secure flatmate platform",
  "secure roommate platform",
  "genuine flatmates",
  "genuine roommates",

  // =========================
  // RENTAL KEYWORDS
  // =========================

  "rental listings",
  "rental listings India",
  "room rental platform",
  "room rental website",
  "room rental app",
  "rental accommodation",
  "affordable rental accommodation",
  "budget rental accommodation",
  "find rental accommodation",
  "rental rooms for students",
  "rental rooms for professionals",

  // =========================
  // PUNE
  // =========================

  "flatmate finder Pune",
  "roommate finder Pune",
  "find flatmates in Pune",
  "find roommates in Pune",
  "rooms for rent in Pune",
  "shared flats in Pune",
  "shared rooms in Pune",
  "flatmates near me Pune",
  "roommates near me Pune",
  "student accommodation Pune",
  "rooms for working professionals Pune",

  // =========================
  // BENGALURU / BANGALORE
  // =========================

  "flatmate finder Bangalore",
  "flatmate finder Bengaluru",
  "roommate finder Bangalore",
  "roommate finder Bengaluru",
  "find flatmates in Bangalore",
  "find roommates in Bangalore",
  "rooms for rent in Bangalore",
  "rooms for rent in Bengaluru",
  "shared flats in Bangalore",
  "shared accommodation Bangalore",

  // =========================
  // HYDERABAD
  // =========================

  "flatmate finder Hyderabad",
  "roommate finder Hyderabad",
  "find flatmates in Hyderabad",
  "find roommates in Hyderabad",
  "rooms for rent in Hyderabad",
  "shared flats in Hyderabad",
  "shared accommodation Hyderabad",

  // =========================
  // MUMBAI
  // =========================

  "flatmate finder Mumbai",
  "roommate finder Mumbai",
  "find flatmates in Mumbai",
  "find roommates in Mumbai",
  "rooms for rent in Mumbai",
  "shared flats in Mumbai",
  "shared accommodation Mumbai",

  // =========================
  // DELHI NCR
  // =========================

  "flatmate finder Delhi",
  "roommate finder Delhi",
  "find flatmates in Delhi",
  "find roommates in Delhi",
  "rooms for rent in Delhi",
  "shared flats in Delhi",
  "flatmate finder Delhi NCR",
  "roommate finder Delhi NCR",

  // =========================
  // NOIDA
  // =========================

  "flatmate finder Noida",
  "roommate finder Noida",
  "find flatmates in Noida",
  "find roommates in Noida",
  "rooms for rent in Noida",
  "shared flats in Noida",

  // =========================
  // GURUGRAM / GURGAON
  // =========================

  "flatmate finder Gurgaon",
  "flatmate finder Gurugram",
  "roommate finder Gurgaon",
  "roommate finder Gurugram",
  "find flatmates in Gurgaon",
  "find roommates in Gurgaon",
  "rooms for rent in Gurgaon",
  "shared flats in Gurgaon",

  // =========================
  // CHENNAI
  // =========================

  "flatmate finder Chennai",
  "roommate finder Chennai",
  "find flatmates in Chennai",
  "find roommates in Chennai",
  "rooms for rent in Chennai",
  "shared flats in Chennai",

  // =========================
  // KOLKATA
  // =========================

  "flatmate finder Kolkata",
  "roommate finder Kolkata",
  "find flatmates in Kolkata",
  "find roommates in Kolkata",
  "rooms for rent in Kolkata",
  "shared flats in Kolkata",

  // =========================
  // OTHER MAJOR CITIES
  // =========================

  "flatmate finder Ahmedabad",
  "roommate finder Ahmedabad",
  "rooms for rent in Ahmedabad",

  "flatmate finder Jaipur",
  "roommate finder Jaipur",
  "rooms for rent in Jaipur",

  "flatmate finder Kochi",
  "roommate finder Kochi",
  "rooms for rent in Kochi",

  "flatmate finder Lucknow",
  "roommate finder Lucknow",
  "rooms for rent in Lucknow",

  "flatmate finder Chandigarh",
  "roommate finder Chandigarh",
  "rooms for rent in Chandigarh",

  "flatmate finder Indore",
  "roommate finder Indore",
  "rooms for rent in Indore",

  // =========================
  // LONG-TAIL SEARCH INTENT
  // =========================

  "how to find a flatmate in India",
  "how to find roommates near me",
  "where to find flatmates online",
  "best website to find flatmates",
  "best app to find roommates",
  "find people looking for flatmates",
  "find people looking for roommates",
  "find someone to share a flat",
  "find someone to share an apartment",
  "find a compatible person to share a flat",
  "find rooms with flatmates",
  "find shared flat without broker",
  "find roommates without broker",
  "find flatmates without broker",
  "find affordable shared rooms",
  "find verified rooms for rent",
  "find verified rental listings",
  "find safe shared accommodation",
].join(", ");
/* =========================================================
   URL HELPERS
========================================================= */

function normalizeUrl(value = SITE_URL) {
  try {
    const url = new URL(value, SITE_URL);

    /*
     * Keep homepage with trailing slash.
     *
     * https://www.urbanhomey.com
     * becomes
     * https://www.urbanhomey.com/
     */
    if (url.origin === SITE_URL && url.pathname === "/") {
      url.pathname = "/";
      url.search = "";
      url.hash = "";

      return url.toString();
    }

    /*
     * Remove trailing slash from internal pages.
     *
     * /blogs/
     * becomes
     * /blogs
     */
    url.pathname = url.pathname.replace(/\/+$/, "");

    /*
     * Canonical URLs should not contain hashes.
     */
    url.hash = "";

    return url.toString();
  } catch (error) {
    console.warn("Invalid SEO URL:", value);

    return `${SITE_URL}/`;
  }
}


function createAbsoluteUrl(value, fallback = DEFAULT_IMAGE) {
  if (!value) {
    return fallback;
  }

  try {
    return new URL(value, SITE_URL).toString();
  } catch (error) {
    console.warn("Invalid SEO asset URL:", value);

    return fallback;
  }
}


/* =========================================================
   SCHEMA HELPERS
========================================================= */

function normalizeSchemas(schema) {
  if (!schema) {
    return [];
  }

  /*
   * Supports:
   *
   * schema={{ ... }}
   *
   * OR
   *
   * schema={[
   *   { ... },
   *   { ... }
   * ]}
   */

  const schemas = Array.isArray(schema)
    ? schema
    : [schema];

  return schemas.filter(
    (item) =>
      item &&
      typeof item === "object" &&
      !Array.isArray(item)
  );
}


/* =========================================================
   SEO COMPONENT
========================================================= */

function SEO({
  /* =========================
     BASIC SEO
  ========================= */

  title = DEFAULT_TITLE,

  description = DEFAULT_DESCRIPTION,

  keywords = DEFAULT_KEYWORDS,


  /* =========================
     URLS
  ========================= */

  url = SITE_URL,

  canonical = true,

  image = DEFAULT_IMAGE,


  /* =========================
     PAGE TYPE
  ========================= */

  type = "website",


  /* =========================
     ROBOTS
  ========================= */

  robots =
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",

  noindex = false,

  nofollow = false,


  /* =========================
     STRUCTURED DATA
  ========================= */

  schema = null,


  /* =========================
     OPEN GRAPH ARTICLE DATA
  ========================= */

  publishedTime = null,

  modifiedTime = null,

  author = null,

  section = null,

  tags = [],


  /* =========================
     SOCIAL
  ========================= */

  twitterSite = null,

  twitterCreator = null,


  /* =========================
     IMAGE DATA
  ========================= */

  imageAlt = null,

  imageWidth = 1200,

  imageHeight = 630,


  /* =========================
     LANGUAGE / LOCALE
  ========================= */

  lang = "en-IN",

  locale = "en_IN",
}) {

  /* =========================================================
     CLEAN BASIC VALUES
  ========================================================= */

  const safeTitle =
    typeof title === "string" && title.trim()
      ? title.trim()
      : DEFAULT_TITLE;


  const safeDescription =
    typeof description === "string" && description.trim()
      ? description.trim()
      : DEFAULT_DESCRIPTION;


  const safeKeywords =
    typeof keywords === "string"
      ? keywords.trim()
      : DEFAULT_KEYWORDS;


  /* =========================================================
     URLS
  ========================================================= */

  const canonicalUrl = normalizeUrl(url);

  const imageUrl = createAbsoluteUrl(
    image,
    DEFAULT_IMAGE
  );


  /* =========================================================
     ROBOTS
  ========================================================= */

  let robotsContent = robots;


  if (noindex && nofollow) {
    robotsContent = "noindex, nofollow";
  } else if (noindex) {
    robotsContent = "noindex, follow";
  } else if (nofollow) {
    robotsContent = "index, nofollow";
  }


  /* =========================================================
     IMAGE ALT
  ========================================================= */

  const finalImageAlt =
    imageAlt?.trim() ||
    `${safeTitle} | ${SITE_NAME}`;


  /* =========================================================
     SCHEMAS
  ========================================================= */

  const schemas = normalizeSchemas(schema);


  /* =========================================================
     TAGS
  ========================================================= */

  const articleTags = Array.isArray(tags)
    ? tags.filter(Boolean)
    : [];


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <Helmet>

      {/* =====================================================
          DOCUMENT
      ===================================================== */}

      <html lang={lang} />


      {/* =====================================================
          BASIC SEO
      ===================================================== */}

      <title>{safeTitle}</title>


      <meta
        name="description"
        content={safeDescription}
      />


      {safeKeywords && (
        <meta
          name="keywords"
          content={safeKeywords}
        />
      )}


      <meta
        name="robots"
        content={robotsContent}
      />


      <meta
        name="googlebot"
        content={robotsContent}
      />


      <meta
        name="bingbot"
        content={robotsContent}
      />


      <meta
        name="author"
        content={SITE_NAME}
      />


      <meta
        name="application-name"
        content={SITE_NAME}
      />


      <meta
        name="theme-color"
        content="#7B3FF2"
      />


      {/* =====================================================
          CANONICAL
      ===================================================== */}

      {canonical && (
        <link
          rel="canonical"
          href={canonicalUrl}
        />
      )}


      {/* =====================================================
          OPEN GRAPH
      ===================================================== */}

      <meta
        property="og:title"
        content={safeTitle}
      />


      <meta
        property="og:description"
        content={safeDescription}
      />


      <meta
        property="og:url"
        content={canonicalUrl}
      />


      <meta
        property="og:type"
        content={type}
      />


      <meta
        property="og:site_name"
        content={SITE_NAME}
      />


      <meta
        property="og:locale"
        content={locale}
      />


      <meta
        property="og:image"
        content={imageUrl}
      />


      <meta
        property="og:image:secure_url"
        content={imageUrl}
      />


      {imageWidth && (
        <meta
          property="og:image:width"
          content={String(imageWidth)}
        />
      )}


      {imageHeight && (
        <meta
          property="og:image:height"
          content={String(imageHeight)}
        />
      )}


      <meta
        property="og:image:alt"
        content={finalImageAlt}
      />


      {/* =====================================================
          ARTICLE OPEN GRAPH METADATA

          Only rendered when:
          type="article"
      ===================================================== */}

      {type === "article" && publishedTime && (
        <meta
          property="article:published_time"
          content={publishedTime}
        />
      )}


      {type === "article" && modifiedTime && (
        <meta
          property="article:modified_time"
          content={modifiedTime}
        />
      )}


      {type === "article" && author && (
        <meta
          property="article:author"
          content={author}
        />
      )}


      {type === "article" && section && (
        <meta
          property="article:section"
          content={section}
        />
      )}


      {type === "article" &&
        articleTags.map((tag) => (
          <meta
            key={tag}
            property="article:tag"
            content={tag}
          />
        ))}


      {/* =====================================================
          TWITTER / X
      ===================================================== */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />


      {twitterSite && (
        <meta
          name="twitter:site"
          content={twitterSite}
        />
      )}


      {twitterCreator && (
        <meta
          name="twitter:creator"
          content={twitterCreator}
        />
      )}


      <meta
        name="twitter:title"
        content={safeTitle}
      />


      <meta
        name="twitter:description"
        content={safeDescription}
      />


      <meta
        name="twitter:image"
        content={imageUrl}
      />


      <meta
        name="twitter:image:alt"
        content={finalImageAlt}
      />


      {/* =====================================================
          MOBILE / APP
      ===================================================== */}

      <meta
        name="mobile-web-app-capable"
        content="yes"
      />


      <meta
        name="apple-mobile-web-app-capable"
        content="yes"
      />


      <meta
        name="apple-mobile-web-app-title"
        content={SITE_NAME}
      />


      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="default"
      />


      {/* =====================================================
          STRUCTURED DATA / JSON-LD

          Supports one schema or multiple schemas.
      ===================================================== */}

      {schemas.map((schemaItem, index) => (
        <script
          key={`seo-schema-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(schemaItem)}
        </script>
      ))}

    </Helmet>
  );
}

export default SEO;