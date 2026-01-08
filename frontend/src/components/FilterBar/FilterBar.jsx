import React from "react";
import "./FilterBar.css";

const FilterBar = ({ filters, onFilterChange, onClearFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter-bar">
      <h2>🔍 Log Query Interface</h2>

      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="message">Search Message</label>
          <input
            type="text"
            id="message"
            name="message"
            value={filters.message}
            onChange={handleInputChange}
            placeholder="Search in messages..."
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="level">Log Level</label>
          <select
            id="level"
            name="level"
            value={filters.level}
            onChange={handleInputChange}
            className="filter-select"
          >
            <option value="">All Levels</option>
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="resourceId">Resource ID</label>
          <input
            type="text"
            id="resourceId"
            name="resourceId"
            value={filters.resourceId}
            onChange={handleInputChange}
            placeholder="e.g., server-1234"
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="traceId">Trace ID</label>
          <input
            type="text"
            id="traceId"
            name="traceId"
            value={filters.traceId}
            onChange={handleInputChange}
            placeholder="e.g., abc-xyz-123"
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="timestamp_start">Start Date</label>
          <input
            type="datetime-local"
            id="timestamp_start"
            name="timestamp_start"
            value={filters.timestamp_start}
            onChange={handleInputChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="timestamp_end">End Date</label>
          <input
            type="datetime-local"
            id="timestamp_end"
            name="timestamp_end"
            value={filters.timestamp_end}
            onChange={handleInputChange}
            className="filter-input"
          />
        </div>
      </div>

      <button className="clear-btn" onClick={onClearFilters}>
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterBar;
