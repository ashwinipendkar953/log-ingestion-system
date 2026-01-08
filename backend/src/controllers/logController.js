const { getAllLogs, addLog } = require("../services/fileService");
const { filterLogs } = require("../services/filterService");

/**
 * POST /logs - Ingest a single log entry
 */
const ingestLog = async (req, res, next) => {
  try {
    const logEntry = req.body;
    const savedLog = addLog(logEntry);

    res.status(201).json(savedLog);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

/**
 * GET /logs - Retrieve logs with optional filters
 */
const queryLogs = async (req, res, next) => {
  try {
    const filters = {
      level: req.query.level,
      message: req.query.message,
      resourceId: req.query.resourceId,
      traceId: req.query.traceId,
      spanId: req.query.spanId,
      commit: req.query.commit,
      timestamp_start: req.query.timestamp_start,
      timestamp_end: req.query.timestamp_end,
    };

    // Remove undefined filters
    Object.keys(filters).forEach((key) => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    const allLogs = getAllLogs();
    const filteredLogs = filterLogs(allLogs, filters);

    res.status(200).json(filteredLogs);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

module.exports = {
  ingestLog,
  queryLogs,
};
