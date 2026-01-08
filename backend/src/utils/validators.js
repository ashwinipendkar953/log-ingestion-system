/**
 * Validate log level
 */
const isValidLevel = (level) => {
  const validLevels = ["error", "warn", "info", "debug"];
  return validLevels.includes(level.toLowerCase());
};

/**
 * Validate ISO 8601 timestamp format
 */
const isValidTimestamp = (timestamp) => {
  // ISO 8601 regex (Z timezone, optional milliseconds)
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

  if (!iso8601Regex.test(timestamp)) {
    return false;
  }

  const date = new Date(timestamp);
  return !isNaN(date.getTime());
};

/**
 * Validate complete log entry
 */
const validateLogEntry = (log) => {
  const errors = [];

  // Check required fields
  const requiredFields = [
    "level",
    "message",
    "resourceId",
    "timestamp",
    "traceId",
    "spanId",
    "commit",
    "metadata",
  ];

  requiredFields.forEach((field) => {
    if (!log.hasOwnProperty(field)) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // If basic structure is invalid, return early
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Validate level
  if (!isValidLevel(log.level)) {
    errors.push("Invalid level. Must be one of: error, warn, info, debug");
  }

  // Validate message is a string
  if (typeof log.message !== "string" || log.message.trim() === "") {
    errors.push("Message must be a non-empty string");
  }

  // Validate resourceId is a string
  if (typeof log.resourceId !== "string" || log.resourceId.trim() === "") {
    errors.push("ResourceId must be a non-empty string");
  }

  // Validate timestamp
  if (!isValidTimestamp(log.timestamp)) {
    errors.push(
      "Invalid timestamp. Must be ISO 8601 format (e.g., 2023-09-15T08:00:00Z)"
    );
  }

  // Validate traceId is a string
  if (typeof log.traceId !== "string" || log.traceId.trim() === "") {
    errors.push("TraceId must be a non-empty string");
  }

  // Validate spanId is a string
  if (typeof log.spanId !== "string" || log.spanId.trim() === "") {
    errors.push("SpanId must be a non-empty string");
  }

  // Validate commit is a string
  if (typeof log.commit !== "string" || log.commit.trim() === "") {
    errors.push("Commit must be a non-empty string");
  }

  // Validate metadata is an object
  if (
    typeof log.metadata !== "object" ||
    log.metadata === null ||
    Array.isArray(log.metadata)
  ) {
    errors.push("Metadata must be a valid JSON object");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

module.exports = {
  isValidLevel,
  isValidTimestamp,
  validateLogEntry,
};
