import React from "react";
import "./LogItem.css";

const LogItem = ({ log, viewMode, isSelected, onSelect }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };

  const getLevelClass = (level) => {
    return `log-item-${level}`;
  };

  return (
    <div
      className={`log-item ${getLevelClass(log.level)} ${
        isSelected ? "selected" : ""
      } ${viewMode === "compact" ? "compact" : ""}`}
      onClick={onSelect}
    >
      {/* Log Header */}
      <div className="log-item-header">
        <div className="log-item-left">
          <span className={`log-level-badge ${log.level}`}>
            {log.level.toUpperCase()}
          </span>

          <span className="log-timestamp">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <circle cx="7" cy="7" r="6" opacity="0.3" />
              <circle cx="7" cy="7" r="1.5" />
            </svg>
            {formatTime(log.timestamp)}
          </span>

          {viewMode !== "compact" && (
            <>
              <span className="log-meta-tag">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                >
                  <path d="M2 3h10v2H2V3zm0 3h10v2H2V6zm0 3h7v2H2V9z" />
                </svg>
                {log.resourceId}
              </span>

              <span className="log-meta-tag">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                >
                  <path d="M2 2h10l-5 10L2 2z" />
                </svg>
                {log.traceId.substring(0, 8)}
              </span>
            </>
          )}
        </div>

        <button className="expand-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Log Message */}
      <div className="log-item-message">{log.message}</div>

      {/* Log Metadata */}
      {viewMode !== "compact" && (
        <div className="log-item-metadata">
          <span className="metadata-item">Span: {log.spanId}</span>
          <span className="metadata-item">Commit: {log.commit}</span>
          {log.metadata && Object.keys(log.metadata).length > 0 && (
            <span className="metadata-item">
              +{Object.keys(log.metadata).length} fields
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default LogItem;
