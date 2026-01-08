/**
 * Filter logs based on query parameters
 * All filters use AND logic (must match all provided criteria)
 */
const filterLogs = (logs, filters) => {
  let filteredLogs = [...logs];

  // Filter by level
  if (filters.level) {
    filteredLogs = filteredLogs.filter(
      (log) => log.level.toLowerCase() === filters.level.toLowerCase()
    );
  }

  // Filter by message (case-insensitive full-text search)
  if (filters.message) {
    const searchTerm = filters.message.toLowerCase();
    filteredLogs = filteredLogs.filter((log) =>
      log.message.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by resourceId
  if (filters.resourceId) {
    filteredLogs = filteredLogs.filter((log) =>
      log.resourceId.toLowerCase().includes(filters.resourceId.toLowerCase())
    );
  }

  // Filter by traceId
  if (filters.traceId) {
    filteredLogs = filteredLogs.filter((log) =>
      log.traceId.toLowerCase().includes(filters.traceId.toLowerCase())
    );
  }

  // Filter by spanId
  if (filters.spanId) {
    filteredLogs = filteredLogs.filter((log) =>
      log.spanId.toLowerCase().includes(filters.spanId.toLowerCase())
    );
  }

  // Filter by commit
  if (filters.commit) {
    filteredLogs = filteredLogs.filter((log) =>
      log.commit.toLowerCase().includes(filters.commit.toLowerCase())
    );
  }

  // Filter by timestamp range
  if (filters.timestamp_start) {
    const startDate = new Date(filters.timestamp_start);
    if (!isNaN(startDate.getTime())) {
      filteredLogs = filteredLogs.filter((log) => {
        const logDate = new Date(log.timestamp);
        return logDate >= startDate;
      });
    }
  }

  if (filters.timestamp_end) {
    const endDate = new Date(filters.timestamp_end);
    if (!isNaN(endDate.getTime())) {
      filteredLogs = filteredLogs.filter((log) => {
        const logDate = new Date(log.timestamp);
        return logDate <= endDate;
      });
    }
  }

  // Sort by timestamp in descending order (most recent first)
  filteredLogs.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB - dateA;
  });

  return filteredLogs;
};

module.exports = {
  filterLogs,
};
