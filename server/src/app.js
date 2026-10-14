require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");
const eventRoutes = require("./routes/eventRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "PulseTrack API is running"
    });
});

// API routes
app.use("/api/events", eventRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();