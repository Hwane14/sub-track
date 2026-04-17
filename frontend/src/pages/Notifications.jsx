import { useNavigate } from "react-router-dom";

function Notifications() {
    const navigate = useNavigate();

    // Temporary mock notifications
    const notifications = [
        { id: 1, message: "Netflix renews in 3 days" },
        { id: 2, message: "Spotify renews tomorrow" },
        { id: 3, message: "Adobe CC renews in 7 days" }
    ];

    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
            <h1>Notifications</h1>

            {/*
            Displays each renewal reminder as a simple notification card.
            Later will be populated from backend data.
            */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
                {notifications.map((note) => (
                    <div
                    key={note.id}
                    style={{
                        padding: "12px",
                        background: "#f1f1f1",
                        borderRadius: "6px",
                        border: "1px solid #ccc"
                    }}
                    >
                        {note.message}
                        </div>
                ))}
            </div>

            <button
            onClick={() => navigate("/dashboard")}
            style={{
                marginTop: "30px",
                width: "100%",
                padding: "12px",
                background: "#007bff",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "16px"
            }}
            >
                Back to Dashboard
            </button>
        </div>
    );
}

export default Notifications;