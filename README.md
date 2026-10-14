# 🚀 PulseTrack — Analytics Backend

PulseTrack Backend is a REST API service built with Node.js and Express.js that collects website interaction events, stores them in MongoDB, and provides analytics endpoints for the PulseTrack dashboard.

The service supports page view tracking, click tracking, session analytics, event timelines, and click coordinate retrieval.

## 🌐 Live Backend

**Production API:** https://pulsetrack-backend-vbg6.onrender.com

**Health Check:** https://pulsetrack-backend-vbg6.onrender.com/api/health

## ✨ Features

- 📥 **Event Collection:** Accept page view and click events through a REST API.
- 🆔 **Session Tracking:** Associate events with session IDs.
- 🗄️ **MongoDB Integration:** Persist event records.
- 📊 **Analytics APIs:** Retrieve analytics summaries and session information.
- 🕒 **Session Timelines:** Retrieve events associated with a particular session.
- 🖱️ **Click Analytics:** Retrieve click coordinate data for a page.
- 🧩 **Modular Architecture:** Organize routes, controllers, configuration, and data models separately.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | HTTP server and REST APIs |
| MongoDB | Event storage |
| Mongoose | MongoDB object modeling |
| dotenv | Environment configuration |
| Nodemon | Development server reloading |
| Render | Backend deployment |

## 🏗️ Architecture

```text
         Website / Tracking Script
                    |
                    v
             Express Server
                    |
                    v
                API Routes
                    |
                    v
               Controllers
                    |
                    v
                Event Model
                    |
                    v
                 MongoDB
                    |
                    v
            Analytics Endpoints
                    |
                    v
             React Dashboard
```

## 🚀 Getting Started

### Prerequisites

Install the following:

- Node.js
- npm
- Git
- A MongoDB database, such as MongoDB Atlas

### 1. Clone the Repository

```bash
git clone https://github.com/MULLANGIROVAN/pulsetrack-backend.git
```

### 2. Navigate to the Server Directory

```bash
cd pulsetrack-backend/server
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your own MongoDB connection string.

For MongoDB Atlas:

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Configure network access for your deployment or development environment.
4. Copy your database connection string.
5. Add the connection string to your local `.env` file.

Do not commit `.env` to GitHub or share your database credentials publicly.

The variable names must match those used by the backend's database configuration.

### 5. Start the Development Server

```bash
npm run dev
```

The backend should start on the configured port.

With `PORT=5000`, the local base URL is:

```text
http://localhost:5000
```

### 6. Verify the Health Endpoint

Open:

```text
http://localhost:5000/api/health
```

A successful response indicates that the health endpoint is responding. Check the server logs and database connection separately to verify complete functionality.

## 🔌 API Documentation

All endpoints below are relative to the backend base URL.

### 1. Health Check

**Endpoint:**

```http
GET /api/health
```

Checks whether the health endpoint responds.

### 2. Collect an Event

**Endpoint:**

```http
POST /api/events
```

**Content-Type:**

```text
application/json
```

This endpoint accepts website interaction events.

#### Example: Page View Event

```json
{
  "session_id": "example-session-id",
  "event_type": "page_view",
  "page_url": "https://example.com/",
  "timestamp": "2026-10-14T10:00:00.000Z"
}
```

#### Example: Click Event

```json
{
  "session_id": "example-session-id",
  "event_type": "click",
  "page_url": "https://example.com/",
  "timestamp": "2026-10-14T10:00:10.000Z",
  "coordinates": {
    "x": 250,
    "y": 400
  }
}
```

Supported event types:

- `page_view`
- `click`

The click event includes coordinates representing the recorded click position.

The request fields and validation requirements are determined by the backend's event model and controller.

### 3. Retrieve Analytics Summary

**Endpoint:**

```http
GET /api/analytics/summary
```

Retrieves the analytics summary provided by the backend.

### 4. Retrieve All Sessions

**Endpoint:**

```http
GET /api/analytics/sessions
```

Retrieves the available session analytics.

### 5. Retrieve a Session Timeline

**Endpoint:**

```http
GET /api/analytics/sessions/:sessionId
```

Retrieves events associated with the specified session.

Example:

```http
GET /api/analytics/sessions/example-session-id
```

Replace `example-session-id` with an actual session ID.

### 6. Retrieve Click Heatmap Data

**Endpoint:**

```http
GET /api/analytics/heatmap?pageUrl=https%3A%2F%2Fexample.com
```

Retrieves click coordinate data associated with the specified page URL.

The `pageUrl` query parameter should contain the URL of the page being analyzed.

**Note:** This endpoint provides click data for analysis. Rendering a visual heatmap is a frontend responsibility.

## 🧪 Testing the API

You can test the endpoints using Postman, an API client, or `curl`.

### Health Check

```bash
curl http://localhost:5000/api/health
```

### Send a Test Page View

```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "test-session-001",
    "event_type": "page_view",
    "page_url": "https://example.com/",
    "timestamp": "2026-10-14T10:00:00.000Z"
  }'
```

### Retrieve Analytics Summary

```bash
curl http://localhost:5000/api/analytics/summary
```

These examples assume the backend is running locally on port 5000.

## ⚙️ Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | Depends on configuration | Port on which the Express server listens |
| `MONGODB_URI` | Yes for MongoDB connectivity | MongoDB connection string |

Keep database credentials private. Use local environment variables for development and your deployment provider's environment-variable settings for production.

## 📁 Project Structure

```text
pulsetrack-backend/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   └── Event.js
│   │   ├── controllers/
│   │   │   ├── eventController.js
│   │   │   └── analyticsController.js
│   │   ├── routes/
│   │   │   ├── eventRoutes.js
│   │   │   └── analyticsRoutes.js
│   │   └── app.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
└── tracker/
    └── tracker.js
```

This tree represents the main project files; the exact structure may vary with subsequent changes.

## 🌍 Deployment

The backend is configured for deployment on Render.

General deployment steps:

1. Push the backend repository to GitHub.
2. Create a Web Service on Render.
3. Connect the backend GitHub repository.
4. Set the root directory to `server`.
5. Set the build command to `npm install`.
6. Set the start command to `npm start`.
7. Configure `MONGODB_URI` and other required environment variables in Render.
8. Deploy the service.
9. Test the health endpoint and analytics APIs.

The deployment must have network access to MongoDB Atlas. Configure database access appropriately and avoid exposing database credentials.

## 🔐 Security and Privacy Considerations

When integrating PulseTrack into a real website:

- Inform users about relevant tracking practices.
- Follow applicable privacy and data-protection requirements.
- Configure CORS to allow only the origins you intend to support.
- Protect database credentials and deployment secrets.
- Validate incoming event data.
- Consider rate limiting and abuse prevention.
- Avoid collecting sensitive personal information unnecessarily.

## 🔍 Troubleshooting

### MongoDB connection failure

- Verify that `MONGODB_URI` is correct.
- Check that the database user has appropriate permissions.
- Confirm that the database is active.
- Check MongoDB Atlas network access settings.
- Review the backend logs.

### Requests fail from the frontend

- Verify that the backend is running.
- Check the API URL.
- Inspect browser network errors.
- Confirm that CORS permits the frontend origin.
- Check the server logs.

### Analytics endpoints return empty data

- Send test events to the event collection endpoint.
- Confirm that events are stored in MongoDB.
- Verify the session ID and page URL being queried.
- Check the backend's analytics controller and query logic.

## 🔮 Future Improvements

- More detailed analytics aggregations
- Date-range filtering
- More efficient click heatmap queries
- Real-time analytics updates
- API rate limiting
- Automated testing
- Improved validation and error handling

## 👨‍💻 Author

**Rovan**

GitHub: https://github.com/MULLANGIROVAN

## 📄 License

No specific open-source license is declared by this README. Add a `LICENSE` file if you intend to distribute the project under a particular license.
