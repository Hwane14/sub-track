function Dashboard() {
    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>

            {/* Header with app name + notifications */}
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Sub-Track</h1>
                <div style={{ position: "relative" }}>
                    <span style={{ fontSize: "24px" }}>🔔</span>
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
                    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                        <strong>Netflix</strong> - £10.99
                        <div>Renews: 12 Feb</div>
                    </div>
                </div>

                <div style={{ marginTop: "10px"}}>
                    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                        <strong>Spotify</strong> - £5.99
                        <div>Renews: 20 Feb</div>
                    </div>
                </div>

                <div style={{ marginTop: "10px"}}>
                    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                        <strong>Adobe CC</strong> - £19.99
                        <div>Renews: 01 March</div>
                    </div>
                </div>
            </section>

            {/* Add subscription button */}
            <button
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