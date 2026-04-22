import { useState } from "react";

function SubscriptionForm({
    initialValues,
    submitLabel,
    onSubmit,
    onCancel,
    showDelete = false,
    onDelete
}) {
    // Local form state (pre-filled when editing)
    const [name, setName] = useState(initialValues.name || "");
    const [cost, setCost] = useState(initialValues.cost || "");
    const [renewal_date, setRenewalDate] = useState(initialValues.renewalDate || "");
    const [category, setCategory] = useState(initialValues.category || "");
    const [status, setStatus] = useState(initialValues.status || "");

    function handleSubmit(e) {
        e.preventDefault();

        // Pass all form data back to parent page
        onSubmit({
            name,
            cost,
            renewal_date,
            category,
            status
        });
    }

    return (
        <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}
        >
            {/* Name */}
            <div>
                <label>Name:</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "10px" }}
                />
            </div>

            {/* Cost */}
            <div>
                <label>Cost (£):</label>
                <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                style={{ width: "100%", padding: "10px" }}
                />
            </div>

            {/* Renewal Date */}
            <div>
                <label>Renewal Date:</label>
                <div style={{ display: "flex", gap: "8px" }}>
                    <input
                    type="date"
                    value={renewal_date}
                    onChange={(e) => setRenewalDate(e.target.value)}
                    style={{ width: "60px", padding: "10px" }}
                    />
                </div>
            </div>

            {/* Category */}
            <div>
                <label>Category:</label>
                <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: "100%", padding: "10px" }}
                >
                    <option value="">Select category</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="education">Education</option>
                    <option value="utilities">Utilities</option>
                    <option value="finance">Finance</option>
                    <option value="health">Health</option>
                    <option value="gaming">Gaming</option>
                    <option value="cloud storage">Cloud Storage</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {/* Status */}
            <div>
                <label>Status:</label>
                {/*
                Each status button highlights itself when selected.
                Clicking the same button again toggles it off
                */}
                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                    <button
                    type="button"
                    onClick={() => setStatus(status === "essential" ? "" : "essential")}
                    style={{ padding: "8px", background: status === "essential" ? "#007bff" : "#ddd" }}
                    >
                        Essential
                    </button>

                    <button
                    type="button"
                    onClick={() => setStatus(status === "optional" ? "" : "optional")}
                    style={{ padding: "8px", background: status === "optional" ? "#007bff" : "#ddd" }}
                    >
                        Optional
                    </button>
                    <button
                    type="button"
                    onClick={() => setStatus(status === "unused" ? "" : "unused")}
                    style={{ padding: "8px", background: status === "unused" ? "#007bff" : "#ddd" }}
                    >
                        Unused
                    </button>
                </div>
            </div>

            {/* Save + Cancel + Delete */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                type="submit"
                style={{ flex: 1, padding: "12px", background: "#28a745", color: "white", border: "none" }}
                >
                    {submitLabel}
                </button>

                <button
                type="button"
                onClick={onCancel}
                style={{ flex: 1, padding: "12px", background: "#6c757d", color: "white", border: "none" }}
                >
                    Cancel
                </button>

                {/* Delete button only appears in edit mode */}
                {showDelete && (
                    <button
                    type="button"
                    onClick={onDelete}
                    style={{ flex: 1, padding: "12px", background: "#dc3545", color: "white", border: "none" }}
                    >
                        Delete
                    </button>
                )}
            </div>
        </form>
    );
}

export default SubscriptionForm;