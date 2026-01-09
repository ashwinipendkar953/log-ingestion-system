const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logRoutes = require("./routes/logRoutes");
const errorHandler = require("./middleware/errorHandler");
const { initializeDataFile } = require("./services/fileService");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize data file on startup
initializeDataFile();

// Routes
app.use("/logs", logRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Error handling middleware
app.use(errorHandler);

if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Logs API available at http://localhost:${PORT}/logs`);
  });
}

module.exports = app;
