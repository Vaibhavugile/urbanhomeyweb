// src/components/AdminRoute.js

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { isAdminUser } from "../utils/admin";

function AdminRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAllowed(isAdminUser(user));
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        Checking access...
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;