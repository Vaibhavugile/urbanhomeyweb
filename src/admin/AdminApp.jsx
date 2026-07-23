import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import AdminRoutes from "./routes/AdminRoutes";

function AdminApp() {
  return (
   <AdminLayout>
      <AdminRoutes />
    </AdminLayout>
  );
}

export default AdminApp;