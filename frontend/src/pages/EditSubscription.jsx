import SubscriptionForm from "../components/SubscriptionForm";
import { useNavigate } from "react-router-dom";

function EditSubscription() {
    const navigate = useNavigate();

    // Example existing subscription (will come from backend later)
    const subscription = {
        name: "Netflix",
        cost: "10.99",
        renewDate: "2026-02-12",
        category: "entertainment",
        status: "essential"
    };

    // Handles updating an existing subscription (placeholder until backend integration)
    function handleUpdate(data) {
        console.log("Updating subscription:", data);
        navigate("/dashboard");
    }

    // Deletes the subscription (placeholder until backend integration)
    function handleDelete() {
        console.log("Deleting subscription:");
        navigate("/dashboard");
    }

    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
            <h1>Edit Subscription</h1>

            <SubscriptionForm
            initialValues={subscription}
            submitLabel="Save Changes"
            showDelete={true}
            onSubmit={handleUpdate}
            onCancel={() => navigate("/dashboard")}
            onDelete={handleDelete}
            />
        </div>
    );
}

export default EditSubscription;