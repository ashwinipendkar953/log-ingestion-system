import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  stats,
  resourceCounts,
  filters,
  onToggleLevel,
  onClearLevels,
  onFilterChange,
}) => {
  const levels = ["error", "warn", "info", "debug"];
  console.log(filters);

  return (
    <aside className="sidebar">
      {/* OVERVIEW */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">OVERVIEW</h3>

        <div className="stat-card">
          <span className="stat-label">TOTAL EVENTS</span>
          <div className="stat-value">{stats.total}</div>
        </div>

        <div className="stat-card error-card">
          <span className="stat-label">ERRORS</span>
          <div className="stat-value">{stats.error}</div>
        </div>

        <div className="stat-card warn-card">
          <span className="stat-label">WARNINGS</span>
          <div className="stat-value">{stats.warn}</div>
        </div>

        <div className="stat-card info-card">
          <span className="stat-label">INFO</span>
          <div className="stat-value">{stats.info}</div>
        </div>
      </div>

      {/* MULTI-SELECT LEVEL FILTER */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">LOG LEVELS</h3>

        <div className="level-filters">
          <button
            className={`level-filter-btn ${
              filters.levels.length === 0 ? "active" : ""
            }`}
            onClick={onClearLevels}
          >
            All
          </button>

          {levels.map((level) => (
            <button
              key={level}
              className={`level-filter-btn ${
                filters.levels.includes(level) ? "active" : ""
              }`}
              onClick={() => onToggleLevel(level)}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* RESOURCE FILTER */}
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
              <span>{resourceId}</span>
              <span className="resource-count">{count}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
