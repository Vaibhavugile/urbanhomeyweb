import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Users from "../pages/Users/Users";
import FlatListings from "../pages/FlatListings/FlatListings";
import FlatListingDetails from "../pages/FlatListingDetails/FlatListingDetails";
import FlatmateDetails from "../pages/FlatmateDetails/FlatmateDetails";
import FlatmateListings from "../pages/FlatmateListings/FlatmateListings";
import VerificationDetails from "../pages/Verification/VerificationDetails";
import Verification from "../pages/Verification/Verification";
import Payments from "../pages/Payments/Payments";
import PaymentDetails from "../pages/Payments/PaymentDetails";
import Reports from "../pages/Reports/Reports";
import ReportDetails from "../pages/Reports/ReportDetails";
import Matches from "../pages/Matches/Matches";
import MatchDetails from "../pages/Matches/MatchDetails";
import ChatPlans from "../pages/ChatPlans/ChatPlans";
import AddChatPlan from "../pages/ChatPlans/AddChatPlan";
import ListingImageVerification from "../pages/ListingImageVerification/ListingImageVerification";
import ListingImageVerificationDetails from "../pages/ListingImageVerification/ListingImageVerificationDetails";
import ProfileImageVerification from "../pages/ProfileImageVerification/ProfileImageVerification";
import ProfileImageVerificationDetails from "../pages/ProfileImageVerification/ProfileImageVerificationDetails";
import Roles from "../pages/Roles/Roles";
import AddRole from "../pages/Roles/AddRole";
import AdminUsers from "../pages/AdminUsers/AdminUsers";
import AddAdminUser from "../pages/AdminUsers/AddAdminUser";
function AdminRoutes() {
  return (
    <Routes>

      <Route
        index
        element={<Dashboard />}
      />

      {/* Future Pages */}

     <Route
    path="users"
    element={<Users />}
/>

      <Route
        path="listings"
        element={<FlatListings />}
      />
      <Route
  path="roles"
  element={<Roles />}
/>

<Route
  path="roles/add"
  element={<AddRole />}
/>

<Route
  path="roles/edit/:roleId"
  element={<AddRole />}
/>

      <Route
        path="flatmates"
        element={<FlatmateListings />}
      />

      <Route
        path="verification"
        element={<Verification />}
      />

      <Route
        path="payments"
        element={<Payments />}
      />

      <Route
        path="reports"
        element={<Reports />}
      />
      <Route
  path="listing-image-verification"
  element={<ListingImageVerification />}
/>

<Route
  path="listing-image-verification/:id"
  element={<ListingImageVerificationDetails />}
/>
      <Route
    path="reports/:reportId"
    element={<ReportDetails />}
/>

      <Route
    path="chat-plans"
    element={<ChatPlans />}
/>

<Route
    path="chat-plans/add"
    element={<AddChatPlan />}
/>

<Route
    path="chat-plans/edit/:planId"
    element={<AddChatPlan />}
/>
<Route
  path="profile-image-verification"
  element={<ProfileImageVerification />}
/>
<Route
  path="profile-image-verification/:id"
  element={<ProfileImageVerificationDetails />}
/>

      <Route
    path="matches"
    element={<Matches />}
/>

<Route
    path="matches/:matchId"
    element={<MatchDetails />}
/>

      <Route
        path="support"
        element={<div>Support</div>}
      />

      <Route
        path="settings"
        element={<div>Settings</div>}
      />
      <Route
    path="payments/:paymentId"
    element={<PaymentDetails />}
/>
<Route
  path="admin-users"
  element={<AdminUsers />}
/>

<Route
  path="admin-users/add"
  element={<AddAdminUser />}
/>

<Route
  path="admin-users/edit/:adminUserId"
  element={<AddAdminUser />}
/>
    <Route
  path="listings/:uid/:listingId"
  element={<FlatListingDetails />}
/>

<Route
    path="flatmates/:uid/:profileId"
    element={<FlatmateDetails />}
/>
<Route
    path="verification/:userId"
    element={<VerificationDetails />}
/>
      <Route
        path="*"
        element={<Navigate to="/admin" replace />}
      />

    </Routes>
  );
}

export default AdminRoutes;