import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../components/SubscriptionCard";

function Dashboard() {
    const navigate = useNavigate(); // enables navigation to other pages

    // Mock subscription data
    const subscriptions = [
        {
            id: 1,
            name: "Netflix",
            cost: "10.99",
            renewalDate: "2026-02-12",
            category: "entertainment",
            status: "essential"
        },
        {
            id: 2,
            name: "Spotify",
            cost: "5.99",
            renewalDate: "2026-02-20",
            category: "entertainment",
            status: "optional"
        },
        {
            id: 3,
            name: "Adobe CC",
            cost: "19.99",
            renewalDate: "2026-03-01",
            category: "education",
            status: "unused"
        }
    ]

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

                <div style={{ marginTop: "10px"}}>
                    {subscriptions.map((sub) => (
                        <SubscriptionCard
                        key={sub.id}
                        name={sub.name}
                        cost={sub.cost}
                        renewalDate={sub.renewalDate}
                        onClick={() => navigate(`/edit/${sub.id}`)}
                        />
                    ))}
                </div>
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