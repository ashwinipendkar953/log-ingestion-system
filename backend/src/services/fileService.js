const fs = require("fs");
const path = require("path");

const DATA_FILE_PATH =
  process.env.NODE_ENV === "production"
    ? "/tmp/logs.json"
    : path.join(__dirname, "../../data/logs.json");

// In-memory cache for performance
let logsCache = [];

/**
 * Initialize the data file if it doesn't exist
 */
const initializeDataFile = () => {
  try {
    const dirPath = path.dirname(DATA_FILE_PATH);

    // Create data directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Create logs file if it doesn't exist
    if (!fs.existsSync(DATA_FILE_PATH)) {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify([], null, 2));
      console.log("✅ Created new logs.json file");
    }

    // Load existing logs into memory
    logsCache = readLogsFromFile();
    console.log(`✅ Loaded ${logsCache.length} logs from file`);
  } catch (error) {
    console.error("❌ Error initializing data file:", error.message);
    throw error;
  }
};

/**
 * Read logs from JSON file
 */
const readLogsFromFile = () => {
  try {
    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("❌ Error reading logs file:", error.message);
    return [];
  }
};

/**
 * Write logs to JSON file
 */
const writeLogsToFile = (logs) => {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(logs, null, 2));
    return true;
  } catch (error) {
    console.error("❌ Error writing logs file:", error.message);
    throw error;
  }
};

/**
 * Get all logs from memory
 */
const getAllLogs = () => {
  return [...logsCache];
};

/**
 * Add a new log entry
 */
const addLog = (logEntry) => {
  try {
    logsCache.push(logEntry);
    writeLogsToFile(logsCache);
    return logEntry;
  } catch (error) {
    console.error("❌ Error adding log:", error.message);
    throw error;
  }
};

module.exports = {
  initializeDataFile,
  getAllLogs,
  addLog,
  readLogsFromFile,
  writeLogsToFile,
};
