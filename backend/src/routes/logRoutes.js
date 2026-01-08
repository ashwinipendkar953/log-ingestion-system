const express = require("express");
const router = express.Router();
const { ingestLog, queryLogs } = require("../controllers/logController");
const validateLog = require("../middleware/validateLog");

// POST /logs - Ingest a new log entry
router.post("/", validateLog, ingestLog);

// GET /logs - Query logs with filters
router.get("/", queryLogs);

module.exports = router;
