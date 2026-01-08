const { validateLogEntry } = require("../utils/validators");

/**
 * Middleware to validate log entry before processing
 */
const validateLog = (req, res, next) => {
  const log = req.body;

  // Check if body exists
  if (!log || Object.keys(log).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Request body is missing or empty",
    });
  }

  // Validate log entry
  const validation = validateLogEntry(log);

  if (!validation.valid) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Invalid log entry",
      details: validation.errors,
    });
  }

  next();
};

module.exports = validateLog;
