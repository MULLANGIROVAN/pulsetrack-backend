const Event = require("../models/Event");

const createEvent = async (req, res) => {
    try {
        const {
            session_id,
            event_type,
            page_url,
            timestamp,
            coordinates
        } = req.body;

        if (!session_id || !event_type || !page_url) {
            return res.status(400).json({
                success: false,
                message: "session_id, event_type, and page_url are required"
            });
        }

        if (!["page_view", "click"].includes(event_type)) {
            return res.status(400).json({
                success: false,
                message: "Invalid event type"
            });
        }

        if (event_type === "click") {
            if (
                !coordinates ||
                !Number.isFinite(coordinates.x) ||
                !Number.isFinite(coordinates.y)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Valid click coordinates are required"
                });
            }
        }

        const event = await Event.create({
            session_id,
            event_type,
            page_url,
            ...(timestamp !== undefined && { timestamp }),
            ...(event_type === "click" && { coordinates })
        });

        return res.status(201).json({
            success: true,
            message: "Event saved successfully",
            data: event
        });

    } catch (error) {
        if (
            error.name === "ValidationError" ||
            error.name === "CastError"
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid event data"
            });
        }

        console.error("Error saving event:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = { createEvent };