const Event = require("../models/Event");

// GET /api/analytics/summary
const getAnalyticsSummary = async (req, res) => {
    try {
        const [totalEvents, pageViews, clicks, uniqueSessions] =
            await Promise.all([
                Event.countDocuments(),

                Event.countDocuments({
                    event_type: "page_view"
                }),

                Event.countDocuments({
                    event_type: "click"
                }),

                Event.distinct("session_id")
            ]);

        res.status(200).json({
            success: true,
            data: {
                totalEvents,
                totalSessions: uniqueSessions.length,
                pageViews,
                clicks
            }
        });
    } catch (error) {
        console.error("Analytics summary error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch analytics summary"
        });
    }
};

// GET /api/analytics/sessions/:sessionId
const getSessionTimeline = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const events = await Event.find({
            session_id: sessionId
        })
            .sort({ timestamp: 1 })
            .select("-__v");

        res.status(200).json({
            success: true,
            sessionId,
            totalEvents: events.length,
            data: events
        });
    } catch (error) {
        console.error("Session timeline error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch session timeline"
        });
    }
};

// GET /api/analytics/heatmap?pageUrl=...
const getClickHeatmap = async (req, res) => {
    try {
        const { pageUrl } = req.query;

        if (!pageUrl) {
            return res.status(400).json({
                success: false,
                message: "pageUrl query parameter is required"
            });
        }

        const normalizeUrl = (value) => {
            try {
                const url = new URL(value);
                return `${url.origin}${url.pathname}`.replace(/\/+$/, "") || url.origin;
            } catch {
                return value;
            }
        };

        const normalizedPageUrl = normalizeUrl(pageUrl);

        const allClicks = await Event.find({
            event_type: "click"
        }).sort({ timestamp: -1 });

        const matchingClicks = allClicks.filter(
            (event) => normalizeUrl(event.page_url) === normalizedPageUrl
        );

        return res.status(200).json({
            success: true,
            pageUrl: normalizedPageUrl,
            totalClicks: matchingClicks.length,
            data: matchingClicks
        });
    } catch (error) {
        console.error("Click heatmap error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch click analytics"
        });
    }
};



// GET /api/analytics/sessions
const getAllSessions = async (req, res) => {
    try {
        const sessions = await Event.aggregate([
            {
                $sort: { timestamp: 1 }
            },
            {
                $group: {
                    _id: "$session_id",
                    totalEvents: { $sum: 1 },
                    firstSeen: { $first: "$timestamp" },
                    lastSeen: { $last: "$timestamp" }
                }
            },
            {
                $sort: { lastSeen: -1 }
            },
            {
                $project: {
                    _id: 0,
                    sessionId: "$_id",
                    totalEvents: 1,
                    firstSeen: 1,
                    lastSeen: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            totalSessions: sessions.length,
            data: sessions
        });
    } catch (error) {
        console.error("All sessions error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch sessions"
        });
    }
};

module.exports = {
    getAnalyticsSummary,
    getAllSessions,
    getSessionTimeline,
    getClickHeatmap
};