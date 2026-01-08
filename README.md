# 📊 Log Ingestion and Querying System

A full-stack log ingestion and querying system built using **Node.js, Express, and React**.

This project simulates a real-world developer tool for ingesting, storing, filtering, and viewing application logs.

---

## 🎯 Project Overview

The system consists of:

- **Backend (Node.js + Express)**
  - Accepts structured log entries via REST API
  - Stores logs in a single JSON file (no database)
  - Supports multi-criteria filtering and sorting
- **Frontend (React)**
  - Displays logs in a clean, three-panel layout
  - Supports dynamic, real-time filtering
  - Allows viewing detailed log information

Logs are stored in **UTC** and displayed in the user’s **local timezone**.

---

## 📁 Project Structure

```
log-ingestion-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── data/
│   │   └── logs.json (auto-created)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └──index.css
│   └── package.json
│
└── README.md

```

---

## 🚀 Setup & Run Instructions

### Backend

```bash
cd backend
npm install
npm run dev

```

Backend runs at:

`http://localhost:3001`

---

### Frontend

```bash
cd frontend
npm install
npm run dev

```

Frontend runs at:

`http://localhost:5173`

---

## 🔌 API Endpoints

### POST `/logs`

Ingest a single log entry.

**Request Body**

```json
{
  "level": "error",
  "message": "Database connection failed",
  "resourceId": "server-1234",
  "timestamp": "2024-01-08T10:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "error": "timeout"
  }
}
```

**Responses**

- `201 Created` – Log saved successfully
- `400 Bad Request` – Validation failed
- `500 Internal Server Error` – Server error

---

### GET `/logs`

Retrieve logs with optional filters.

**Query Parameters (optional)**

`level`, `message`, `resourceId`, `traceId`, `spanId`, `commit`,

`timestamp_start`, `timestamp_end`

**Response**

- `200 OK` – Array of filtered logs (reverse chronological order)

---

## 🖥️ Frontend Features

- Three-panel layout (sidebar, log list, event details)
- Dynamic filtering (no page reloads)
- Debounced text search (500ms)
- Log level filtering (error, warn, info, debug)
- Resource-based filtering
- Combined filters using AND logic
- Color-coded log levels
- Detailed event view with full metadata

---

## 🧠 Key Design Decisions

- **JSON file storage** was used to demonstrate in-memory data handling and filtering logic without relying on a database.
- **Server-side validation middleware** ensures invalid logs never reach persistence.
- **UTC timestamps** are stored for consistency; the UI converts them to local time.
- **Debounced search** prevents excessive API calls while typing.
- **Separation of concerns** between controllers, services, and middleware improves maintainability.
