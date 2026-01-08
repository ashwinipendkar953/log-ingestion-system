import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import FilterBar from "./components/FilterBar/FilterBar";
import LogList from "./components/LogList/LogList";
import EventDetails from "./components/EventDetails/EventDetails";
import { fetchLogs } from "./services/api";
import { useDebounce } from "./hooks/useDebounce";
import "./App.css";

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const [viewMode, setViewMode] = useState("comfortable");

  const [filters, setFilters] = useState({
    message: "",
    level: "",
    resourceId: "",
    traceId: "",
    spanId: "",
    commit: "",
    timestamp_start: "",
    timestamp_end: "",
  });

  const debouncedMessage = useDebounce(filters.message, 500);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      message: "",
      level: "",
      resourceId: "",
      traceId: "",
      spanId: "",
      commit: "",
      timestamp_start: "",
      timestamp_end: "",
    });
  };

  const loadLogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiFilters = { ...filters };
      apiFilters.message = debouncedMessage;

      if (apiFilters.timestamp_start) {
        apiFilters.timestamp_start = new Date(
          apiFilters.timestamp_start
        ).toISOString();
      }
      if (apiFilters.timestamp_end) {
        apiFilters.timestamp_end = new Date(
          apiFilters.timestamp_end
        ).toISOString();
      }

      const data = await fetchLogs(apiFilters);
      setLogs(data);
    } catch (err) {
      setError(err.message || "Failed to load logs");
      console.error("Error loading logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [
    debouncedMessage,
    filters.level,
    filters.resourceId,
    filters.traceId,
    filters.spanId,
    filters.commit,
    filters.timestamp_start,
    filters.timestamp_end,
  ]);

  const logStats = useMemo(() => {
    const levelCounts = logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {});

    return {
      total: logs.length,
      error: levelCounts.error || 0,
      warn: levelCounts.warn || 0,
      info: levelCounts.info || 0,
      debug: levelCounts.debug || 0,
    };
  }, [logs]);

  const resourceCounts = useMemo(() => {
    const counts = {};
    logs.forEach((log) => {
      counts[log.resourceId] = (counts[log.resourceId] || 0) + 1;
    });
    return counts;
  }, [logs]);

  return (
    <div className="app">
      <nav className="top-nav">
        <div className="nav-left">
          <div className="brand">
            <svg className="brand-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"
                fillOpacity="0.2"
              />
              <path d="M4 4h5v5H4V4zm11 0h5v5h-5V4zM4 15h5v5H4v-5zm11 0h5v5h-5v-5z" />
            </svg>
            <span className="brand-text">LogStream</span>
          </div>
        </div>

        <div className="nav-center">
          <div className="nav-tabs">
            <button className="nav-tab active">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M2 3h12v2H2V3zm0 4h12v2H2V7zm0 4h12v2H2v-2z" />
              </svg>
              Logs
            </button>
            <button className="nav-tab">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M14 2H2v12h12V2zM4 12V4h8v8H4z" />
              </svg>
              Metrics
            </button>
            <button className="nav-tab">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M2 2l6 6-6 6V2zm8 0l4 6-4 6V2z" />
              </svg>
              Traces
            </button>
            <button className="nav-tab">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 2a6 6 0 100 12A6 6 0 008 2z" />
              </svg>
              APM
            </button>
          </div>
        </div>

        <div className="nav-right">
          <button className="icon-btn" title="Pause">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M6 4h2v10H6V4zm4 0h2v10h-2V4z" />
            </svg>
          </button>
          <button className="icon-btn" title="Settings">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M9 11a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M7.5 2h3l.5 1.5 1.5.5 1.5-.5 2 2-.5 1.5.5 1.5v3l-1.5.5-.5 1.5.5 1.5-2 2-1.5-.5-1.5.5h-3l-.5-1.5-1.5-.5-.5 1.5-2-2 .5-1.5-.5-1.5v-3l1.5-.5.5-1.5-.5-1.5 2-2 1.5.5L7.5 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div className="main-content">
        <Sidebar
          stats={logStats}
          resourceCounts={resourceCounts}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <div className="center-panel">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <LogList
            logs={logs}
            loading={loading}
            error={error}
            viewMode={viewMode}
            selectedLog={selectedLog}
            onLogSelect={setSelectedLog}
          />
        </div>

        {selectedLog !== null && (
          <EventDetails
            log={logs[selectedLog]}
            onClose={() => setSelectedLog(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
