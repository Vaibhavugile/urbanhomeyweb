import React from "react";
import { NavLink } from "react-router-dom";

import {
  MdDashboard,
  MdPeople,
  MdHomeWork,
  MdVerifiedUser,
  MdImage,
  MdPayments,
  MdSupportAgent,
  MdSettings,
  MdReport,
  MdFavorite,
  MdWorkspacePremium,
  MdSecurity,
  MdAdminPanelSettings,
} from "react-icons/md";

import "./Sidebar.css";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <MdDashboard />,
    permission: "dashboard",
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <MdPeople />,
    permission: "users",
  },
  {
    title: "Listings",
    path: "/admin/listings",
    icon: <MdHomeWork />,
    permission: "listings",
  },
  {
    title: "Flatmates",
    path: "/admin/flatmates",
    icon: <MdPeople />,
    permission: "flatmates",
  },
  {
    title: "Verification",
    path: "/admin/verification",
    icon: <MdVerifiedUser />,
    permission: "verification",
  },
  {
    title: "Listing Images",
    path: "/admin/listing-image-verification",
    icon: <MdImage />,
    permission: "listingImages",
  },
  {
    title: "Profile Images",
    path: "/admin/profile-image-verification",
    icon: <MdImage />,
    permission: "profileImages",
  },
  {
    title: "Payments",
    path: "/admin/payments",
    icon: <MdPayments />,
    permission: "payments",
  },
  {
    title: "Reports",
    path: "/admin/reports",
    icon: <MdReport />,
    permission: "reports",
  },
  {
    title: "Matches",
    path: "/admin/matches",
    icon: <MdFavorite />,
    permission: "matches",
  },
  {
    title: "Plans",
    path: "/admin/chat-plans",
    icon: <MdWorkspacePremium />,
    permission: "plans",
  },
  {
    title: "Roles",
    path: "/admin/roles",
    icon: <MdSecurity />,
    permission: "roles",
  },
  {
    title: "Admin Users",
    path: "/admin/admin-users",
    icon: <MdAdminPanelSettings />,
    permission: "adminUsers",
  },
  {
    title: "Support",
    path: "/admin/support",
    icon: <MdSupportAgent />,
    permission: "support",
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <MdSettings />,
    permission: "settings",
  },
];

function Sidebar() {

  const session = JSON.parse(
    localStorage.getItem("adminSession") || "{}"
  );

  const permissions =
    session.permissions || {};

  const visibleMenus =
    menuItems.filter((item) => {

      // Super Admin (all access)
      if (session.roleId === "super_admin") {
        return true;
      }

      return permissions[item.permission];

    });

  return (

    <aside className="sidebar">

      {/* ======================================
            LOGO
      ======================================= */}

      <div className="sidebar-logo">

        <div className="logo-circle">
          UH
        </div>

        <div>

          <h2>
            UrbanHomey
          </h2>

          <span>
            Admin Panel
          </span>

        </div>

      </div>

      {/* ======================================
            MENU
      ======================================= */}

      <nav className="sidebar-menu">

        {visibleMenus.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >

            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>
              {item.title}
            </span>

          </NavLink>

        ))}

      </nav>

      {/* ======================================
            FOOTER
      ======================================= */}

      <div className="sidebar-footer">

        <div className="admin-avatar">

          {session?.name
            ? session.name.charAt(0).toUpperCase()
            : "A"}

        </div>

        <div>

          <h4>

            {session?.name || "Administrator"}

          </h4>

          <p>

            {session?.roleName || "Admin"}

          </p>

        </div>

      </div>

    </aside>

  );

}

export default Sidebar;