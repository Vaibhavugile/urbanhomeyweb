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
} from "react-icons/md";

import "./Sidebar.css";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <MdDashboard />,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <MdPeople />,
  },
  {
    title: "Listings",
    path: "/admin/listings",
    icon: <MdHomeWork />,
  },
    {
    title: "Flatmates",
    path: "/admin/flatmates",
    icon: <MdPeople />,
  },
  {
    title: "Verification",
    path: "/admin/verification",
    icon: <MdVerifiedUser />,
  },
  {
  title: "Listing Images",
  path: "/admin/listing-image-verification",
  icon: <MdImage />,
},

  {
    title: "Payments",
    path: "/admin/payments",
    icon: <MdPayments />,
  },
  {
    title: "Reports",
    path: "/admin/reports",
    icon: <MdReport />,
  },
{
    title: "Matches",
    icon: <MdFavorite/>,
    path: "/admin/matches",
},
{
    title:"Plans",

    icon:<MdWorkspacePremium />,

    path:"/admin/chat-plans",
},
  {
    title: "Support",
    path: "/admin/support",
    icon: <MdSupportAgent />,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <MdSettings />,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-circle">
          UH
        </div>

        <div>
          <h2>UrbanHomey</h2>
          <span>Admin Panel</span>
        </div>

      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => (
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

      <div className="sidebar-footer">

        <div className="admin-avatar">
          A
        </div>

        <div>
          <h4>Admin</h4>
          <p>Super Admin</p>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;