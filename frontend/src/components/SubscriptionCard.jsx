function SubscriptionCard({ name, price, renewDate }) {
    return (
        <div style={{ padding: "10px 0", borderBottom: "1px solid #ccc" }}>
            <strong>{name}</strong> - £{price}
            <div>Renews: {renewDate}</div>
        </div>
    );
}

export default SubscriptionCard;