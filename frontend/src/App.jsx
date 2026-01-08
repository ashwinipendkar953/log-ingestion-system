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

  // ✅ MULTI-SELECT LEVEL FILTER
  const [filters, setFilters] = useState({
    message: "",
    levels: [], // ['error', 'warn']
    resourceId: "",
    traceId: "",
    spanId: "",
    commit: "",
    timestamp_start: "",
    timestamp_end: "",
  });

  const debouncedMessage = useDebounce(filters.message, 500);

  /* ------------------------
     FILTER HANDLERS
  -------------------------*/
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleLevelFilter = (level) => {
    setFilters((prev) => {
      const exists = prev.levels.includes(level);
      return {
        ...prev,
        levels: exists
          ? prev.levels.filter((l) => l !== level)
          : [...prev.levels, level],
      };
    });
  };

  const clearAllLevels = () => {
    setFilters((prev) => ({ ...prev, levels: [] }));
  };

  const handleClearFilters = () => {
    setFilters({
      message: "",
      levels: [],
      resourceId: "",
      traceId: "",
      spanId: "",
      commit: "",
      timestamp_start: "",
      timestamp_end: "",
    });
  };

  /* ------------------------
     LOAD LOGS
  -------------------------*/
  const loadLogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiFilters = {
        message: debouncedMessage,
        resourceId: filters.resourceId,
        traceId: filters.traceId,
        spanId: filters.spanId,
        commit: filters.commit,
      };

      // Multi-level → comma-separated
      if (filters.levels.length > 0) {
        apiFilters.level = filters.levels.join(",");
      }

      if (filters.timestamp_start) {
        apiFilters.timestamp_start = new Date(
          filters.timestamp_start
        ).toISOString();
      }

      if (filters.timestamp_end) {
        apiFilters.timestamp_end = new Date(
          filters.timestamp_end
        ).toISOString();
      }

      const data = await fetchLogs(apiFilters);
      setLogs(data);
    } catch (err) {
      setError(err.message || "Failed to load logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [
    debouncedMessage,
    filters.levels,
    filters.resourceId,
    filters.traceId,
    filters.spanId,
    filters.commit,
    filters.timestamp_start,
    filters.timestamp_end,
  ]);

  /* ------------------------
     SIDEBAR STATS
  -------------------------*/
  const logStats = useMemo(() => {
    const counts = logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {});

    return {
      total: logs.length,
      error: counts.error || 0,
      warn: counts.warn || 0,
      info: counts.info || 0,
      debug: counts.debug || 0,
    };
  }, [logs]);

  const resourceCounts = useMemo(() => {
    const counts = {};
    logs.forEach((log) => {
      counts[log.resourceId] = (counts[log.resourceId] || 0) + 1;
    });
    return counts;
  }, [logs]);

  /* ------------------------
     RENDER
  -------------------------*/
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
          </div>
        </div>
      </nav>

      <div className="main-content">
        <Sidebar
          stats={logStats}
          resourceCounts={resourceCounts}
          filters={filters}
          onToggleLevel={toggleLevelFilter}
          onClearLevels={clearAllLevels}
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
