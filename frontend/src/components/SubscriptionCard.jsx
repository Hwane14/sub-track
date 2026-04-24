// Reusable UI component for displaying a single subscription entry
function SubscriptionCard({ name, cost, renewalDate, onClick }) {

    // Convert ISO string to readable date
    const formattedDate = new Date(renewalDate).toLocaleString("en-UK", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    return (
        <div
        onClick={onClick}
        style={{ 
            padding: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "8px",
            cursor: "pointer",
            background: "white"
        }}
        >
            <strong>{name}</strong> - £{cost}
            <div>Renews: {formattedDate}</div>
        </div>
    );
}

export default SubscriptionCard;