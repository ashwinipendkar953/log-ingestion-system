import React from "react";
import LogItem from "../LogItem/LogItem";
import "./LogList.css";

const LogList = ({
  logs,
  loading,
  error,
  viewMode,
  selectedLog,
  onLogSelect,
}) => {
  if (loading) {
    return (
      <div className="log-list-state">
        <div className="spinner"></div>
        <p>Loading logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="log-list-state error-state">
        <span className="error-icon">⚠️</span>
        <h3>Error Loading Logs</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="log-list-state empty-state">
        <span className="empty-icon">📭</span>
        <h3>No Logs Found</h3>
        <p>
          No logs match your current filters. Try adjusting your search
          criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="log-list-container">
      <div className="log-list-header">
        <span className="log-count">{logs.length} events</span>
      </div>

      <div className="log-stream">
        {logs.map((log, index) => (
          <LogItem
            key={`${log.traceId}-${log.spanId}-${index}`}
            log={log}
            viewMode={viewMode}
            isSelected={selectedLog === index}
            onSelect={() => onLogSelect(selectedLog === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default LogList;
