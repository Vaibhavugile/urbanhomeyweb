import React from "react";
import "./StatCard.css";

function StatCard({
  title,
  value,
  icon,
  color = "#7C3AED",
  subtitle,
  trend,
}) {
  return (
    <div className="stat-card">

      <div className="stat-card-top">

        <div>

          <p className="stat-title">
            {title}
          </p>

          <h2 className="stat-value">
            {value}
          </h2>

          {subtitle && (
            <span className="stat-subtitle">
              {subtitle}
            </span>
          )}

        </div>

        <div
          className="stat-icon"
          style={{
            background: color,
          }}
        >
          {icon}
        </div>

      </div>

      {trend && (
        <div className="stat-trend">
          {trend}
        </div>
      )}

    </div>
  );
}

export default StatCard;