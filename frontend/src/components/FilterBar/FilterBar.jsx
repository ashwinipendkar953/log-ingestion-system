import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = ({
  filters,
  onFilterChange,
  onClearFilters,
  viewMode,
  onViewModeChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="filter-bar-container">
      <div className="filter-bar-header">
        <div className="filter-bar-left">
          <svg
            className="filter-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="filter-bar-title">Query Builder</h2>
        </div>

        <div className="filter-bar-right">
          <select
            className="view-mode-select"
            value={viewMode}
            onChange={(e) => onViewModeChange(e.target.value)}
          >
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="detailed">Detailed</option>
          </select>
          <button
            className="toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            >
              <path
                fillRule="evenodd"
                d="M8 10.5L3.5 6h9L8 10.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="filter-bar-content">
          {/* Main Search */}
          <div className="search-wrapper">
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              id="message"
              name="message"
              value={filters.message}
              onChange={handleInputChange}
              placeholder="Search logs by message, trace ID, or keyword..."
              className="search-input"
            />
            {filters.message && (
              <button
                className="clear-search-btn"
                onClick={() => onFilterChange("message", "")}
                aria-label="Clear search"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Advanced Filters Grid */}
          <div className="filter-grid-compact">
            <input
              type="text"
              id="resourceId"
              name="resourceId"
              value={filters.resourceId}
              onChange={handleInputChange}
              placeholder="Resource ID (e.g., server-1234)"
              className="filter-input-compact"
            />
            <input
              type="text"
              id="traceId"
              name="traceId"
              value={filters.traceId}
              onChange={handleInputChange}
              placeholder="Trace ID (e.g., abc-xyz-123)"
              className="filter-input-compact"
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="filter-actions">
              <button className="clear-all-btn" onClick={onClearFilters}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 108 1a7 7 0 000 14zm3.707-10.707L9.414 6.586 11.707 8.88a1 1 0 01-1.414 1.414L8 8.001l-2.293 2.293a1 1 0 11-1.414-1.414l2.293-2.293-2.293-2.293a1 1 0 011.414-1.414L8 5.173l2.293-2.293a1 1 0 011.414 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
