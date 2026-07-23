import React from "react";

import "./PageLayout.css";

function PageLayout({
  title,
  subtitle,
  actions,
  children,
}) {
  return (
    <div className="page-layout">

      <div className="page-header">

        <div>

          <h1>{title}</h1>

          {subtitle && (
            <p>{subtitle}</p>
          )}

        </div>

        <div className="page-actions">
          {actions}
        </div>

      </div>

      <div className="page-body">
        {children}
      </div>

    </div>
  );
}

export default PageLayout;