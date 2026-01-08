# **📊 Log Ingestion and Querying System**

A full-stack web application for ingesting, storing, and querying application logs. Built with Node.js, Express, and React.

## **🎯 Project Overview**

This system simulates a real-world developer tool used for monitoring and debugging applications. It consists of:

- **Backend**: RESTful API built with Node.js and Express that accepts log entries and provides powerful querying capabilities
- **Frontend**: React-based UI for searching, filtering, and viewing logs with an intuitive interface
- **Data Storage**: JSON file-based persistence (no external database required)

## **✨ Features**

### **Backend**

- ✅ RESTful API with proper status codes and error handling
- ✅ JSON file-based persistence with in-memory caching
- ✅ Comprehensive input validation
- ✅ Multiple simultaneous filter support (AND logic)
- ✅ Case-insensitive full-text search
- ✅ Timestamp range filtering
- ✅ Clean, modular architecture

### **Frontend**

- ✅ Dynamic filtering with real-time updates
- ✅ Debounced search input (500ms delay)
- ✅ Visual log level differentiation (color-coded)
- ✅ Loading indicators and error states
- ✅ Clear filters functionality
- ✅ Responsive design
- ✅ Empty state handling

## **🛠️ Tech Stack**

### **Backend**

- Node.js
- Express.js
- Built-in `fs` module for file operations
- CORS middleware

### **Frontend**

- React 18
- Vite (build tool)
- Axios (HTTP client)
- Custom hooks (useDebounce)
- CSS3 with modern styling

## **📁 Project Structure**

`log-ingestion-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── logController.js       # Request handlers
│   │   ├── middleware/
│   │   │   ├── errorHandler.js        # Global error handler
│   │   │   └── validateLog.js         # Input validation
│   │   ├── routes/
│   │   │   └── logRoutes.js           # API routes
│   │   ├── services/
│   │   │   ├── fileService.js         # File I/O operations
│   │   │   └── filterService.js       # Log filtering logic
│   │   ├── utils/
│   │   │   └── validators.js          # Validation helpers
│   │   └── server.js                  # Entry point
│   ├── data/
│   │   └── logs.json                  # Auto-generated data file
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FilterBar/            # Filter controls
│   │   │   ├── LogList/              # Log container
│   │   │   └── LogItem/              # Individual log display
│   │   ├── services/
│   │   │   └── api.js                # API client
│   │   ├── hooks/
│   │   │   └── useDebounce.js        # Debounce hook
│   │   ├── App.jsx                   # Main component
│   │   └── main.jsx                  # Entry point
│   └── package.json
└── README.md`

## **🚀 Installation & Setup**

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn

### **Backend Setup**

1. **Navigate to backend directory:**

bash

`cd backend`

1. **Install dependencies:**

bash

`npm install`

1. **Create .env file (optional):**

bash

`PORT=3001
NODE_ENV=development`

1. **Start the server:**

bash

`# Development mode with auto-restart
npm run dev

# Production mode

npm start`

The backend server will start at `http://localhost:3001`

### **Frontend Setup**

1. **Navigate to frontend directory:**

bash

`cd frontend`

1. **Install dependencies:**

bash

`npm install`

1. **Start development server:**

bash

`npm run dev`

The frontend will start at `http://localhost:5173`

## **📡 API Documentation**

### **Base URL**

`http://localhost:3001`

### **Endpoints**

### **1. Ingest Log Entry**

**POST** `/logs`

Accepts a single log entry and persists it to storage.

**Request Body:**

json

`{
  "level": "error",
  "message": "Failed to connect to database",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "parentResourceId": "server-5678"
  }
}`

**Success Response:** `201 Created`

json

`{
  "level": "error",
  "message": "Failed to connect to database",
  ...
}`

**Error Response:** `400 Bad Request`

json

`{
  "error": "Bad Request",
  "message": "Invalid log entry",
  "details": ["Missing required field: level"]
}`

### **2. Query Logs**

**GET** `/logs`

Retrieves logs with optional filtering. All filters use AND logic.

**Query Parameters:**

- `level` (string): Filter by log level (error, warn, info, debug)
- `message` (string): Full-text search in message field
- `resourceId` (string): Filter by resource identifier
- `traceId` (string): Filter by trace ID
- `spanId` (string): Filter by span ID
- `commit` (string): Filter by commit hash
- `timestamp_start` (ISO 8601): Filter logs after this time
- `timestamp_end` (ISO 8601): Filter logs before this time

**Example:**

`GET /logs?level=error&message=database&timestamp_start=2023-09-15T00:00:00Z`

**Success Response:** `200 OK`

json

`[
  {
    "level": "error",
    "message": "Failed to connect to database",
    "resourceId": "server-1234",
    ...
  }
]`

## **🎨 UI Features**

### **Filter Bar**

- **Text Search**: Full-text search across log messages with debouncing
- **Level Filter**: Dropdown to filter by severity (error, warn, info, debug)
- **Resource ID**: Filter logs from specific resources
- **Trace ID**: Filter by distributed tracing ID
- **Date Range**: Start and end datetime pickers
- **Clear Filters**: Reset all filters with one click

### **Log Display**

- **Color Coding**:
  - 🔴 Error: Red border and background tint
  - 🟡 Warning: Yellow border and background tint
  - 🔵 Info: Blue border and background tint
  - ⚫ Debug: Gray border and background tint
- **Hover Effects**: Subtle animations on hover
- **Metadata Expansion**: JSON metadata displayed in formatted code blocks
- **Responsive Layout**: Works on various screen sizes

### **States**

- **Loading**: Spinner animation while fetching data
- **Empty**: Clear message when no logs match filters
- **Error**: User-friendly error display with icon

## **🏗️ Design Decisions**

### **Why JSON File Instead of Database?**

- **Simplicity**: No external dependencies or setup required
- **Focus on Logic**: Demonstrates JavaScript data manipulation skills
- **Easy Testing**: Simple to inspect and modify data
- **Fast Prototyping**: Quick iteration during development

### **File-Based Persistence Strategy**

- **In-Memory Cache**: Logs loaded into memory on server start for fast reads
- **Write-Through**: New logs immediately written to file and added to cache
- **Atomic Operations**: Synchronized file writes prevent corruption

### **Frontend Architecture**

- **Component Composition**: Each UI element is a reusable component
- **Custom Hooks**: useDebounce prevents excessive API calls
- **Controlled Components**: All form inputs managed via React state
- **Separation of Concerns**: API logic separated from UI components

### **API Design**

- **RESTful Conventions**: Standard HTTP methods and status codes
- **Query Parameters**: Filters passed as URL parameters for easy caching
- **Validation First**: Input validated before processing
- **Clear Error Messages**: Detailed error responses aid debugging

## **🎯 Key Implementation Highlights**

### **Backend**

1. **Modular Structure**: Controllers, services, middleware, and routes separated
2. **Validation Layer**: Schema validation before data persistence
3. **Error Handling**: Global error handler with proper status codes
4. **Filter Logic**: Efficient array operations with proper sorting
5. **File Safety**: Directory creation and error handling for file operations

### **Frontend**

1. **Debounced Search**: Prevents API spam during typing
2. **Dynamic Filtering**: Automatic re-fetch on filter changes
3. **Loading States**: UX feedback during async operations
4. **ISO 8601 Handling**: Proper datetime conversion for API calls
5. **Responsive Grid**: CSS Grid for flexible filter layout

## **🧪 Testing the Application**

### **Sample Log Entry**

Use this curl command to test log ingestion:

bash

`curl -X POST http://localhost:3001/logs \
  -H "Content-Type: application/json" \
  -d '{
    "level": "error",
    "message": "Database connection timeout",
    "resourceId": "server-1234",
    "timestamp": "2024-01-08T10:30:00Z",
    "traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
      "userId": "user-789",
      "endpoint": "/api/users"
    }
  }'`

### **Testing Filters**

1. Open the UI at `http://localhost:5173`
2. Ingest multiple logs with different levels and messages
3. Try various filter combinations
4. Observe real-time updates as you type
5. Test date range filtering with specific timestamps

## **📈 Future Enhancements (Optional Bonuses)**

If time permits, consider implementing:

- [ ] WebSocket for real-time log updates
- [ ] Chart.js visualization for log level distribution
- [ ] Docker containerization with docker-compose
- [ ] Unit tests for filtering logic
- [ ] Pagination for large log sets
- [ ] Export logs as CSV/JSON
- [ ] Log level statistics dashboard

## **🐛 Troubleshooting**

### **Backend won't start**

- Ensure Node.js v16+ is installed: `node --version`
- Check if port 3001 is available
- Verify all dependencies are installed: `npm install`

### **Frontend can't connect to backend**

- Confirm backend is running at `http://localhost:3001`
- Check browser console for CORS errors
- Verify API_BASE_URL in `frontend/src/services/api.js`

### **Logs not appearing**

- Check browser Network tab for API responses
- Verify logs.json file exists in `backend/data/`
- Check backend console for error messages

## **📝 Assumptions & Trade-offs**

### **Assumptions**

1. Single user environment (no authentication needed)
2. Log volume fits in memory (<100MB)
3. Desktop browser usage (mobile optimization minimal)
4. Local development environment

### **Trade-offs**

1. **JSON vs Database**: Chose simplicity over scalability
2. **In-Memory Cache**: Fast reads but limited by RAM
3. **No Pagination**: Simpler implementation, may slow with 1000+ logs
4. **Synchronous File Writes**: Slower but prevents data loss
5. **Frontend Polling**: Could use WebSockets but adds complexity

## **👨‍💻 Development Experience**

This project was designed to be completed in 6-8 hours and demonstrates:

- Full-stack development capabilities
- Clean code and architecture
- Problem-solving without external databases
- User-focused interface design
- Professional documentation practices

## **📄 License**

MIT License - Feel free to use this project for learning or as a portfolio piece.

---

**Built with ❤️ as a full-stack developer assessment project**
