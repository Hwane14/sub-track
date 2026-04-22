import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubscriptions } from "../services/api";

function Notifications() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const res = await getSubscriptions();
                const subs = res.data.subscriptions;

                const today = new Date();

                // Filter subscriptions renewing within the next 7 days
                const upcoming = subs.map(sub => {
                    const renewal = new Date(sub.renewal_date);
                    // Convert millisecond difference into whole days
                    const diffDays = Math.ceil(
                        (renewal - today) / (1000 * 60 * 60 * 24)
                    );

                    return {
                        id: sub.subscription_id,
                        name: sub.name,
                        diffDays
                    };
                })
                .filter(item => item.diffDays >= 0 && item.diffDays <= 7);

                setNotifications(upcoming);
            } catch (err) {
                console.error(err);
            }
        }

        fetchNotifications();
    }, []);

    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
            <h1>Notifications</h1>

            {/* Shows subscriptions renewing within 7 days */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
                {notifications.length === 0 ? (
                    <p>No upcoming renewals.</p>
                ) : (
                    notifications.map(note => (
                        <div
                        key={note.id}
                        style={{
                            padding: "12px",
                            background: "#f1f1f1",
                            borderRadius: "6px",
                            border: "1px solid #ccc"
                        }}
                        >
                            {/* Add s for plural days */}
                            {note.name} renews in {note.diffDays} day{note.diffDays !== 1 ? "s" : ""}
                            </div>
                    ))
                )}
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