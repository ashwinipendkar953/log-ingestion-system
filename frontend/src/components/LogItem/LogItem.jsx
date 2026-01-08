import React from "react";
import "./LogItem.css";

const LogItem = ({ log }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className={`log-item log-${log.level}`}>
      <div className="log-header">
        <span className={`log-level-badge level-${log.level}`}>
          {log.level.toUpperCase()}
        </span>
        <span className="log-timestamp">{formatTimestamp(log.timestamp)}</span>
      </div>

      <div className="log-message">{log.message}</div>

      <div className="log-details">
        <div className="log-detail-row">
          <span className="log-detail-label">Resource:</span>
          <span className="log-detail-value">{log.resourceId}</span>
        </div>
        <div className="log-detail-row">
          <span className="log-detail-label">Trace ID:</span>
          <span className="log-detail-value">{log.traceId}</span>
        </div>
        <div className="log-detail-row">
          <span className="log-detail-label">Span ID:</span>
          <span className="log-detail-value">{log.spanId}</span>
        </div>
        <div className="log-detail-row">
          <span className="log-detail-label">Commit:</span>
          <span className="log-detail-value">{log.commit}</span>
        </div>
      </div>

      {log.metadata && Object.keys(log.metadata).length > 0 && (
        <div className="log-metadata">
          <span className="log-metadata-label">Metadata:</span>
          <pre className="log-metadata-content">
            {JSON.stringify(log.metadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default LogItem;
