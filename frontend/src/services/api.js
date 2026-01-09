import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch logs with optional filters
 */
export const fetchLogs = async (filters = {}) => {
  try {
    const params = {};

    // Only add non-empty filter values
    if (filters.level) params.level = filters.level;
    if (filters.message) params.message = filters.message;
    if (filters.resourceId) params.resourceId = filters.resourceId;
    if (filters.traceId) params.traceId = filters.traceId;
    if (filters.spanId) params.spanId = filters.spanId;
    if (filters.commit) params.commit = filters.commit;
    if (filters.timestamp_start)
      params.timestamp_start = filters.timestamp_start;
    if (filters.timestamp_end) params.timestamp_end = filters.timestamp_end;

    const response = await api.get("/logs", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

/**
 * Ingest a new log entry
 */
export const ingestLog = async (logEntry) => {
  try {
    const response = await api.post("/logs", logEntry);
    return response.data;
  } catch (error) {
    console.error("Error ingesting log:", error);
    throw error;
  }
};
