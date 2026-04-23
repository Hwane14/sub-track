import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../components/SubscriptionCard";
import CategoryButton from "../components/CategoryButton";
// For loading backend data
import { useEffect, useState } from "react";
import { getSubscriptions } from "../services/api";

function Dashboard() {
    const navigate = useNavigate(); // enables navigation to other pages

    // Local state for subscription data + active category + error handling
    const [subscriptions, setSubscriptions] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
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
            }
        }

        fetchSubscriptions();
    }, []);

    // Categories
    const categories = [
        {label: "All", value: "all"},
        {label: "Entertainment", value: "entertainment"},
        {label: "Education", value: "education"},
        {label: "Utilities", value: "utilities"},
        {label: "Finance", value: "finance"},
        {label: "Health", value: "health"},
        {label: "Gaming", value: "gaming"},
        {label: "Cloud Storage", value: "cloud storage"},
        {label: "Other", value: "other"},
    ]

    // Category filtering
    const handleCategoryFilter = (category) => {
        setActiveCategory(category);
    };
    const filteredSubscriptions = activeCategory === "all"
        ? subscriptions
        : subscriptions.filter(sub => sub.category === activeCategory);

    // Sum all subscription costs (monthly outgoing)
    const monthlyTotal = filteredSubscriptions.reduce((sum, sub) => {
        return sum + Number(sub.cost);
    }, 0)

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
                </div>
            </header>

            {/* Category filter buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                {categories.map(cat => (
                    <CategoryButton
                    key={cat.value}
                    label={cat.label}
                    value={cat.value}
                    activeCategory={activeCategory}
                    onClick={handleCategoryFilter}
                    />
                ))}
            </div>

            {/* Montly summary */}
            <section style={{ marginTop: "30px" }}>
                <h2>Monthly Summary: £{monthlyTotal.toFixed(2)} / month</h2>
            </section>

            {/* Subscription List */}
            <section style={{ marginTop: "20px" }}>
                <h3>Subscription List</h3>

                {/* 
                - Shows error message if the request fails
                - Otherwise renders the subscription list
                - Passes subscription object to edit page via React Router state
                */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!error && (
                    <div style={{ marginTop: "10px"}}>
                        {filteredSubscriptions.map((sub) => (
                            <SubscriptionCard
                            key={sub.id}
                            name={sub.name}
                            cost={sub.cost}
                            renewalDate={sub.renewal_date}
                            onClick={() => navigate(`/edit/${sub.id}`, { state: sub })}
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