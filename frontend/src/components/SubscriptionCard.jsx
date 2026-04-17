// Reusable UI component for displaying a single subscripiton entry
function SubscriptionCard({ name, cost, renewalDate, onClick }) {
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
            <div>Renews: {renewalDate}</div>
        </div>
    );
}

export default SubscriptionCard;