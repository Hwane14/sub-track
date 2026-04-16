import SubscriptionForm from "../components/SubscriptionForm";
import { useNavigate } from "react-router-dom";

function AddSubscription() {
    const navigate = useNavigate();

    // Handles creating a new subscription (backend integration later)
    function handleCreate(data) {
        console.log("Creating subscription:", data);
        navigate("/dashboard");
    }

    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
            <h1>Add Subscription</h1>

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