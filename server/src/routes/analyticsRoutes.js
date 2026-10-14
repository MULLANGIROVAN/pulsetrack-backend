const express = require("express");

const {
    getAnalyticsSummary,
    getAllSessions,
    getSessionTimeline,
    getClickHeatmap
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/summary", getAnalyticsSummary);

router.get("/sessions", getAllSessions);

router.get("/sessions/:sessionId", getSessionTimeline);

router.get("/heatmap", getClickHeatmap);

module.exports = router;