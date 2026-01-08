import React, { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar/FilterBar";
import LogList from "./components/LogList/LogList";
import { fetchLogs } from "./services/api";
import { useDebounce } from "./hooks/useDebounce";
import "./App.css";

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Debounce the message search to avoid excessive API calls
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
      // Prepare filters for API call
      const apiFilters = { ...filters };

      // Use debounced message value
      apiFilters.message = debouncedMessage;

      // Convert datetime-local to ISO 8601
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

  // Load logs on mount and when filters change
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

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>📊 Log Ingestion System</h1>
          <p>Monitor and query application logs in real-time</p>
        </header>

        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <LogList logs={logs} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;
