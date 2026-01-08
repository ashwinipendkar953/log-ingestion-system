import React, { useState } from "react";
import "./EventDetails.css";

const EventDetails = ({ log, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyJSON = async () => {
    try {
      const jsonString = JSON.stringify(log, null, 2);
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <aside className="event-details-panel">
      <div className="event-details-header">
        <h3 className="event-details-title">Event Details</h3>
        <button className="close-btn" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="event-details-content">
        {/* Level */}
        <div className="detail-section">
          <label className="detail-label">LEVEL</label>
          <span className={`level-badge-large ${log.level}`}>
            {log.level.toUpperCase()}
          </span>
        </div>

        {/* Message */}
        <div className="detail-section">
          <label className="detail-label">MESSAGE</label>
          <div className="detail-value">{log.message}</div>
        </div>

        {/* Timestamp */}
        <div className="detail-section">
          <label className="detail-label">TIMESTAMP</label>
          <div className="detail-value mono">
            {formatTimestamp(log.timestamp)}
          </div>
        </div>

        {/* Resource ID */}
        <div className="detail-section">
          <label className="detail-label">RESOURCE ID</label>
          <code className="code-value">{log.resourceId}</code>
        </div>

        {/* Trace ID */}
        <div className="detail-section">
          <label className="detail-label">TRACE ID</label>
          <code className="code-value">{log.traceId}</code>
        </div>

        {/* Span ID */}
        <div className="detail-section">
          <label className="detail-label">SPAN ID</label>
          <code className="code-value">{log.spanId}</code>
        </div>

        {/* Commit Hash */}
        <div className="detail-section">
          <label className="detail-label">COMMIT HASH</label>
          <code className="code-value">{log.commit}</code>
        </div>

        {/* Metadata */}
        {log.metadata && Object.keys(log.metadata).length > 0 && (
          <div className="detail-section">
            <label className="detail-label">METADATA</label>
            <pre className="metadata-json">
              {JSON.stringify(log.metadata, null, 2)}
            </pre>
          </div>
        )}

        {/* Copy Button */}
        <button className="copy-json-btn" onClick={handleCopyJSON}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            {copied ? (
              <path
                fillRule="evenodd"
                d="M13.293 3.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L6.5 9.086l6.293-6.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            ) : (
              <>
                <path d="M4 2a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2V4a2 2 0 00-2-2H4z" />
                <path d="M6 0a2 2 0 012 2h2a2 2 0 012 2v6a2 2 0 01-2 2v-2h2V4H8V2H6V0z" />
              </>
            )}
          </svg>
          {copied ? "Copied!" : "Copy Event JSON"}
        </button>
      </div>
    </aside>
  );
};

export default EventDetails;
