import SubscriptionForm from "../components/SubscriptionForm";
import { useNavigate, useLocation } from "react-router-dom";
import { updateSubscription } from "../services/api";

function EditSubscription() {
    const navigate = useNavigate();

    // Get subscription object from dashboard page via React Router state
    const location = useLocation();
    const subscription = location.state;

    // Send updated subscription fields to backend and save changes
    async function handleUpdate(values) {
        try {
            await updateSubscription(subscription.subscription_id, values)

            navigate("/dashboard");
        } catch(err) {
            console.error(err);
        }
    };

    // Deletes the subscription (placeholder until backend integration)
    function handleDelete() {
        console.log("Deleting subscription:");
        navigate("/dashboard");
    }

    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
            <h1>Edit Subscription</h1>

            {/* Pre-fill form with selected subscription's details */}
            <SubscriptionForm
            initialValues={{
                name: subscription.name,
                cost: subscription.cost,
                renewalDate: subscription.renewal_date,
                category: subscription.category,
                status: subscription.status
            }}
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