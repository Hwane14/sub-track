import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../components/SubscriptionCard";
// For loading backend data
import { useEffect, useState } from "react";
import { getSubscriptions } from "../services/api";

function Dashboard() {
    const navigate = useNavigate(); // enables navigation to other pages

    // Local state for subscription data + loading/error handling
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch the logged-in user's subscriptions on the first render
    // Uses the session cookie (sent automatically via withCredentials) to identify the user
    useEffect(() => {
        async function fetchSubscriptions() {
            try {
                const res = await getSubscriptions();
                setSubscriptions(res.data.subscriptions);
            } catch (err) {
                setError("Failed to load subscriptions.");
            } finally {
                setLoading(false);
            }
        }

        fetchSubscriptions();
    }, []);

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>

            {/* Header with app name + notifications */}
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Sub-Track</h1>
                <div style={{ position: "relative" }}>
                    <span 
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={() => navigate("/notifications")}
                    >
                        🔔
                        </span>
                    {/* Notification badge */}
                    <span
                    style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-10px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "12px"
                    }}
                    >
                        3
                    </span>
                </div>
            </header>

            {/* Category filter buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button>All</button>
                <button>Entertainment</button>
                <button>Edu</button>
                <button>Other</button>
            </div>

            {/* Montly summary */}
            <section style={{ marginTop: "30px" }}>
                <h2>Montly Summary: £XX / month</h2>
            </section>

            {/* Subscription List */}
            <section style={{ marginTop: "20px" }}>
                <h3>Subscription List</h3>

                {/* 
                Shows loading message while fetching
                Shows error message if the request fails
                Otherwise renders the subscription list
                */}
                {loading && <p>Loading subscriptions...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && (
                    <div style={{ marginTop: "10px"}}>
                        {subscriptions.map((sub) => (
                            <SubscriptionCard
                            key={sub.id}
                            name={sub.name}
                            cost={sub.cost}
                            renewalDate={sub.renewal_date}
                            onClick={() => navigate(`/edit/${sub.id}`)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Add subscription button */}
            <button
            onClick={() => navigate("/add")} // navigates to Add Subscription page
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
                + Add Subscription
            </button>
        </div>
    );
}

export default Dashboard;