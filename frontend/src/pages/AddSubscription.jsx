import { useState } from "react";
import SubscriptionForm from "../components/SubscriptionForm";
import { useNavigate } from "react-router-dom";
import { createSubscription } from "../services/api";

function AddSubscription() {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    // Handle form submission: send new subscription to backend, then return to
    // dashboard on success.
    async function handleCreate({name, cost, renewal_date, category, status}) {
        try {
            await createSubscription({
                name,
                cost,
                renewal_date,
                category,
                status
            });
            navigate("/dashboard");
        } catch (err) {
            setError("Failed to create subscription.");
        }
    }

    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
            <h1>Add Subscription</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <SubscriptionForm
            initialValues={{}}
            submitLabel="Save"
            onSubmit={handleCreate}
            onCancel={() => navigate("/dashboard")}
            />
        </div>
    );
}

export default AddSubscription;