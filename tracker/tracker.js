(function () {
    const API_URL = "http://localhost:5000/api/events";

    // Generate or reuse a session ID
    function getSessionId() {
        const storageKey = "pulsetrack_session_id";

        let sessionId = localStorage.getItem(storageKey);

        if (!sessionId) {
            sessionId =
                "session_" +
                (crypto.randomUUID
                    ? crypto.randomUUID()
                    : Date.now() + "_" + Math.random().toString(36).slice(2));

            localStorage.setItem(storageKey, sessionId);
        }

        return sessionId;
    }

    const sessionId = getSessionId();

    // Send an event to the backend
    function trackEvent(eventType, coordinates) {
        const event = {
            session_id: sessionId,
            event_type: eventType,
            page_url: window.location.href,
            timestamp: new Date().toISOString()
        };

        if (coordinates) {
            event.coordinates = coordinates;
        }

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to send analytics event");
                }

                return response.json();
            })
            .then(() => {
                console.log("PulseTrack event recorded:", event);
            })
            .catch((error) => {
                console.error("PulseTrack error:", error.message);
            });
    }

    // Track a page view when the script loads
    trackEvent("page_view");

    // Track clicks across the page
    document.addEventListener("click", function (event) {
        trackEvent("click", {
            x: event.pageX,
            y: event.pageY
        });
    });
})();