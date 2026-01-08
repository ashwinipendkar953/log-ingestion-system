import React from "react";
import "./Sidebar.css";

const Sidebar = ({ stats, resourceCounts, filters, onFilterChange }) => {
  const levels = ["error", "warn", "info", "debug"];

  return (
    <aside className="sidebar">
      {/* Overview Section */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">OVERVIEW</h3>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">TOTAL EVENTS</span>
            <div className="stat-indicator neutral"></div>
          </div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-subtext">Last 24 hours</div>
        </div>

        <div className="stat-card error-card">
          <div className="stat-header">
            <span className="stat-label">ERRORS</span>
            <div className="stat-indicator error"></div>
          </div>
          <div className="stat-value error-text">{stats.error}</div>
          <div className="stat-subtext">
            {stats.total > 0
              ? ((stats.error / stats.total) * 100).toFixed(1)
              : 0}
            % of total
          </div>
        </div>

        <div className="stat-card warn-card">
          <div className="stat-header">
            <span className="stat-label">WARNINGS</span>
            <div className="stat-indicator warn"></div>
          </div>
          <div className="stat-value warn-text">{stats.warn}</div>
          <div className="stat-subtext">
            {stats.total > 0
              ? ((stats.warn / stats.total) * 100).toFixed(1)
              : 0}
            % of total
          </div>
        </div>

        <div className="stat-card info-card">
          <div className="stat-header">
            <span className="stat-label">INFO</span>
            <div className="stat-indicator info"></div>
          </div>
          <div className="stat-value info-text">{stats.info}</div>
          <div className="stat-subtext">
            {stats.total > 0
              ? ((stats.info / stats.total) * 100).toFixed(1)
              : 0}
            % of total
          </div>
        </div>
      </div>

      {/* Quick Filters Section */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">QUICK FILTERS</h3>
        <div className="level-filters">
          <button
            className={`level-filter-btn ${!filters.level ? "active" : ""}`}
            onClick={() => onFilterChange("level", "")}
          >
            <span className="level-dot all"></span>
            All
          </button>
          {levels.map((level) => (
            <button
              key={level}
              className={`level-filter-btn ${
                filters.level === level ? "active" : ""
              }`}
              onClick={() => onFilterChange("level", level)}
            >
              <span className={`level-dot ${level}`}></span>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Section */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">RESOURCES</h3>
        <div className="resource-list">
          {Object.entries(resourceCounts).map(([resourceId, count]) => (
            <button
              key={resourceId}
              className={`resource-item ${
                filters.resourceId === resourceId ? "active" : ""
              }`}
              onClick={() =>
                onFilterChange(
                  "resourceId",
                  filters.resourceId === resourceId ? "" : resourceId
                )
              }
            >
              <svg
                className="resource-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M2 3h12v2H2V3zm0 4h12v2H2V7zm0 4h8v2H2v-2z" />
              </svg>
              <span className="resource-name">{resourceId}</span>
              <span className="resource-count">{count}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
