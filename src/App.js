import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

/* =========================================================
   GLOBAL COMPONENTS
========================================================= */

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SocialSidebar from "./components/SocialSidebar/SocialSidebar";
import PageLayout from "./components/PageLayout/PageLayout";
import SEO from "./components/SEO/SEO";

/* =========================================================
   HOME COMPONENTS
========================================================= */

import HomeBanner from "./components/HomeBanner/HomeBanner";
import OptionCards from "./components/OptionCards/OptionCards";
import WorksSection from "./components/WorksSection/WorksSection";
import MatchSection from "./components/MatchSection/MatchSection";
import Reviews from "./components/Reviews/Reviews";
import Blogs from "./components/Blogs/Blogs";

/* =========================================================
   MATCH COMPONENTS
========================================================= */

import ModernMatchUI from "./components/ModernMatchUI/ModernMatchUI";
import ModernLivingCards from "./components/ModernLivingCards/ModernLivingCards";

/* =========================================================
   AUTH
========================================================= */

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AdminRoute from "./components/AdminRoute";

/* =========================================================
   USER / DASHBOARD
========================================================= */

import Dashboard from "./components/Dashboard/Dashboard";

import BasicInfo from "./components/ListRoom/BasicInfo/BasicInfo";

import RoomListingForm from "./components/ListRoom/RoomListingForm/RoomListingForm";

import ProfilePage from "./components/Profilepage/Profilepage";

import ListingQuestionnaire from "./components/ListingQuestionnaire/ListingQuestionnaire";

import EditProfile from "./components/Editprofile/Editprofile";

/* =========================================================
   BLOGS
========================================================= */

import BlogsPage from "./pages/BlogsPage/BlogsPage";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import AddBlog from "./pages/AddBlog/AddBlog";
import CitiesPage from "./pages/CitiesPage/CitiesPage";
import CityPage from "./pages/CityPage/CityPage";
/* =========================================================
   FOOTER PAGES
========================================================= */

import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Press from "./pages/Press/Press";
import Support from "./pages/Support/Support";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";

/* =========================================================
   DOWNLOAD APP
========================================================= */

import Downloadpage from "./components/Downloadpage/Downloadpage";
import AdminApp from "./admin/AdminApp";

/* =========================================================
   WEBSITE CONSTANTS
========================================================= */

const SITE_URL = "https://www.urbanhomey.com";
const SITE_NAME = "UrbanHomey";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;


/* =========================================================
   SCROLL TO TOP
========================================================= */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}


/* =========================================================
   SCROLL TO HOMEPAGE SECTION
========================================================= */

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const sectionId = sessionStorage.getItem("scrollTo");

    if (!sectionId) {
      return;
    }

    sessionStorage.removeItem("scrollTo");

    let attempts = 0;

    const interval = window.setInterval(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.clearInterval(interval);
        return;
      }

      attempts += 1;

      if (attempts >= 20) {
        window.clearInterval(interval);
      }
    }, 100);

    return () => {
      window.clearInterval(interval);
    };
  }, [location.pathname]);

  return null;
}


/* =========================================================
   HOME PAGE
========================================================= */

function HomePage() {
  /*
   * Homepage SEO + structured data.
   *
   * Keep all claims accurate and consistent
   * with visible website content.
   */

  const homeSchema = {
    "@context": "https://schema.org",

    "@graph": [
      /* =====================================================
         ORGANIZATION
      ===================================================== */

      {
        "@type": "Organization",

        "@id": `${SITE_URL}/#organization`,

        name: SITE_NAME,

        alternateName: [
          "Urban Homey",
          "UrbanHomey India",
        ],

        url: `${SITE_URL}/`,

        logo: {
          "@type": "ImageObject",

          "@id": `${SITE_URL}/#logo`,

          url: `${SITE_URL}/mainlogo.png`,

          contentUrl: `${SITE_URL}/mainlogo.png`,

          caption: SITE_NAME,
        },

        image: {
          "@id": `${SITE_URL}/#logo`,
        },

        description:
          "UrbanHomey is a platform for discovering compatible flatmates, roommates, rooms for rent and shared accommodation across India.",

        knowsAbout: [
          "Flatmates",
          "Roommates",
          "Rooms for Rent",
          "Shared Accommodation",
          "Shared Flats",
          "Flatmate Matching",
          "Roommate Matching",
          "Rental Housing",
        ],
      },


      /* =====================================================
         WEBSITE
      ===================================================== */

      {
        "@type": "WebSite",

        "@id": `${SITE_URL}/#website`,

        url: `${SITE_URL}/`,

        name: SITE_NAME,

        alternateName: "Urban Homey",
        description:
            "Find compatible flatmates, roommates and rooms for rent across India with UrbanHomey. Match by location, budget, lifestyle and living preferences.",


        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },

        inLanguage: "en-IN",
      },


      /* =====================================================
         HOMEPAGE
      ===================================================== */

      {
        "@type": "WebPage",

        "@id": `${SITE_URL}/#webpage`,

        url: `${SITE_URL}/`,

        name:
          "UrbanHomey | Find Flatmates, Roommates & Rooms for Rent",

        description:
          "Find compatible flatmates, roommates and rooms for rent across India with UrbanHomey. Match by location, budget, lifestyle and living preferences.",

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        about: {
          "@id": `${SITE_URL}/#organization`,
        },

        primaryImageOfPage: {
          "@type": "ImageObject",

          url: DEFAULT_IMAGE,
        },

        inLanguage: "en-IN",
      },
    ],
  };


  return (
    <>
      {/* =====================================================
          HOMEPAGE SEO
      ===================================================== */}

      <SEO
        title="UrbanHomey | Find Flatmates, Roommates & Rooms for Rent"
        description="Find compatible flatmates, roommates and rooms for rent across India with UrbanHomey. Match by location, budget, lifestyle and living preferences."
        url={`${SITE_URL}/`}
        image={DEFAULT_IMAGE}
        type="website"
        schema={homeSchema}
      />


      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />


      {/* =====================================================
          HOMEPAGE CONTENT
      ===================================================== */}

      <main>

        <HomeBanner />

        <OptionCards />

        <WorksSection />

        <MatchSection />

        <Reviews />

        <Blogs />

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </>
  );
}


/* =========================================================
   MATCHES PAGE
========================================================= */

function MatchesPage() {
  return (
    <PageLayout>
      <SEO
        title="Find Compatible Flatmates & Roommates | UrbanHomey"
        description="Discover compatible flatmates and roommates with UrbanHomey based on location, budget, lifestyle preferences and daily habits."
        keywords="find flatmates, find roommates, compatible flatmates, roommate finder India, flatmate matching"
        url={`${SITE_URL}/matches`}
        image={DEFAULT_IMAGE}
      />

      <main>
        <ModernMatchUI />
        <ModernLivingCards />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   LIST ROOM PAGE
========================================================= */

function ListRoomPage() {
  return (
    <PageLayout>
      <SEO
        title="List a Room | UrbanHomey"
        description="List your available room on UrbanHomey and connect with compatible people looking for shared accommodation."
        url={`${SITE_URL}/list-room`}
        image={DEFAULT_IMAGE}
        noindex
      />

      <main>
        <BasicInfo />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   FIND ROOM FORM
========================================================= */

function FindRoomPage() {
  return (
    <PageLayout>
      <SEO
        title="Create Your Room Requirements | UrbanHomey"
        description="Tell UrbanHomey your room, location, budget and lifestyle preferences to discover compatible shared living opportunities."
        url={`${SITE_URL}/find-room`}
        image={DEFAULT_IMAGE}
        noindex
      />

      <main>
        <RoomListingForm />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   PROFILE PAGE
========================================================= */

function UserProfilePage() {
  return (
    <PageLayout>
      <SEO
        title="Your Profile | UrbanHomey"
        description="Manage your UrbanHomey profile."
        url={`${SITE_URL}/profile`}
        noindex
      />

      <main>
        <ProfilePage />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   QUESTIONNAIRE PAGE
========================================================= */

function QuestionnairePage() {
  return (
    <PageLayout>
      <SEO
        title="Complete Your Profile | UrbanHomey"
        description="Complete your UrbanHomey preferences and profile information."
        url={`${SITE_URL}/profile/questionnaire`}
        noindex
      />

      <main>
        <ListingQuestionnaire />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   EDIT PROFILE PAGE
========================================================= */

function EditProfilePage() {
  return (
    <PageLayout>
      <SEO
        title="Edit Your Profile | UrbanHomey"
        description="Update your UrbanHomey profile and preferences."
        url={`${SITE_URL}/profile/edit`}
        noindex
      />

      <main>
        <EditProfile />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   ABOUT PAGE
========================================================= */

function AboutPage() {
  return (
    <PageLayout>
      <SEO
        title="About UrbanHomey | Flatmate & Roommate Finder"
        description="Learn about UrbanHomey and our mission to help people discover compatible flatmates, roommates and better shared living opportunities."
        keywords="about UrbanHomey, flatmate finder India, roommate finder India"
        url={`${SITE_URL}/about`}
        image={DEFAULT_IMAGE}
      />

      <main>
        <About />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   CONTACT PAGE
========================================================= */

function ContactPage() {
  return (
    <PageLayout>
      <SEO
        title="Contact UrbanHomey | Get in Touch"
        description="Contact UrbanHomey for help, questions, feedback or information about our flatmate, roommate and shared living platform."
        url={`${SITE_URL}/contact`}
        image={DEFAULT_IMAGE}
      />

      <main>
        <Contact />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   PRESS PAGE
========================================================= */

function PressPage() {
  return (
    <PageLayout>
      <SEO
        title="UrbanHomey Press & Media"
        description="Find UrbanHomey press information, company updates and media resources."
        url={`${SITE_URL}/press`}
        image={DEFAULT_IMAGE}
      />

      <main>
        <Press />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   SUPPORT PAGE
========================================================= */

function SupportPage() {
  return (
    <PageLayout>
      <SEO
        title="UrbanHomey Help & Support"
        description="Get help using UrbanHomey, managing your account, finding flatmates and using shared living features."
        url={`${SITE_URL}/support`}
        image={DEFAULT_IMAGE}
      />

      <main>
        <Support />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   PRIVACY PAGE
========================================================= */

function PrivacyPage() {
  return (
    <PageLayout>
      <SEO
        title="Privacy Policy | UrbanHomey"
        description="Read the UrbanHomey Privacy Policy and learn how information is collected, used, protected and managed."
        url={`${SITE_URL}/privacy`}
        image={DEFAULT_IMAGE}
      />

      <main>
        <Privacy />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   TERMS PAGE
========================================================= */

function TermsPage() {
  return (
    <PageLayout>
      <SEO
        title="Terms & Conditions | UrbanHomey"
        description="Read the UrbanHomey Terms and Conditions governing access to and use of the UrbanHomey platform."
        url={`${SITE_URL}/terms`}
        image={DEFAULT_IMAGE}
      />

      <main>
        <Terms />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   DOWNLOAD APP PAGE
========================================================= */

function DownloadAppPage() {
  return (
    <PageLayout>
      <SEO
        title="Download UrbanHomey App | Find Flatmates & Rooms"
        description="Download the UrbanHomey mobile app to discover compatible flatmates, roommates and shared living opportunities."
        keywords="UrbanHomey app, download flatmate finder app, roommate finder app India"
        url={`${SITE_URL}/download-app`}
        image={DEFAULT_IMAGE}
      />

      <main>
        <Downloadpage />
      </main>
    </PageLayout>
  );
}


/* =========================================================
   LOGIN PAGE
========================================================= */

function LoginPage() {
  return (
    <>
      <SEO
        title="Login | UrbanHomey"
        description="Log in to your UrbanHomey account."
        url={`${SITE_URL}/login`}
        noindex
      />

      <Login />
    </>
  );
}


/* =========================================================
   SIGNUP PAGE
========================================================= */

function SignupPage() {
  return (
    <>
      <SEO
        title="Create Account | UrbanHomey"
        description="Create your UrbanHomey account."
        url={`${SITE_URL}/signup`}
        noindex
      />

      <Signup />
    </>
  );
}


/* =========================================================
   DASHBOARD PAGE
========================================================= */

function DashboardPage() {
  return (
    <>
      <SEO
        title="Dashboard | UrbanHomey"
        description="Manage your UrbanHomey account."
        url={`${SITE_URL}/dashboard`}
        noindex
      />

      <Dashboard />
    </>
  );
}


/* =========================================================
   ADD BLOG PAGE
========================================================= */

function AddBlogPage() {
  return (
    <>
      <SEO
        title="Add Blog | UrbanHomey"
        description="UrbanHomey blog administration page."
        url={`${SITE_URL}/add-blog`}
        noindex
      />

      <AdminRoute>
        <AddBlog />
      </AdminRoute>
    </>
  );
}


/* =========================================================
   404 PAGE
========================================================= */

function NotFoundPage() {
  return (
    <PageLayout>
      <SEO
        title="Page Not Found | UrbanHomey"
        description="The requested page could not be found."
        url={`${SITE_URL}/404`}
        noindex
      />

      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 20px 60px",
          textAlign: "center",
        }}
      >
        <div>
          <h1>404 - Page Not Found</h1>

          <p
            style={{
              marginTop: "12px",
            }}
          >
            The page you are looking for does not exist.
          </p>
        </div>
      </main>
    </PageLayout>
  );
}


/* =========================================================
   APPLICATION ROUTES
========================================================= */

function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <ScrollToSection />

      {/* <SocialSidebar /> */}

      <Routes>

        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={<HomePage />}
        />


        {/* =================================================
            AUTH
        ================================================= */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />


        {/* =================================================
            USER ACCOUNT
        ================================================= */}

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/profile/edit"
          element={<EditProfilePage />}
        />

        <Route
          path="/profile/:type"
          element={<QuestionnairePage />}
        />

        <Route
          path="/profile"
          element={<UserProfilePage />}
        />


        {/* =================================================
            MATCHING / LISTING
        ================================================= */}

        <Route
          path="/matches"
          element={<MatchesPage />}
        />

        <Route
          path="/list-room"
          element={<ListRoomPage />}
        />

        <Route
          path="/find-room"
          element={<FindRoomPage />}
        />
{/* =========================
    CITY SEO LANDING PAGES
========================= */}

<Route
  path="/cities"
  element={<CitiesPage />}
/>

<Route
  path="/city/:citySlug"
  element={<CityPage />}
/>

        {/* =================================================
            BLOGS

            IMPORTANT:
            BlogsPage and BlogDetails should contain their own
            SEO components because their metadata is dynamic.
        ================================================= */}

        <Route
          path="/blogs"
          element={<BlogsPage />}
        />

        <Route
          path="/blog/:slug"
          element={<BlogDetails />}
        />


        {/* =================================================
            ADMIN
        ================================================= */}

        <Route
          path="/add-blog"
          element={<AddBlogPage />}
        />


        {/* =================================================
            PUBLIC PAGES
        ================================================= */}

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        <Route
          path="/press"
          element={<PressPage />}
        />

        <Route
          path="/support"
          element={<SupportPage />}
        />

        <Route
          path="/privacy"
          element={<PrivacyPage />}
        />

        <Route
          path="/terms"
          element={<TermsPage />}
        />

        <Route
          path="/download-app"
          element={<DownloadAppPage />}
        />


        {/* =================================================
            404

            KEEP THIS ROUTE LAST.
        ================================================= */}
 <Route path="/admin/*" element={<AdminApp />} />
        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>
    </>
  );
}


/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;