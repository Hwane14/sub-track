import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddSubscription() {
    // Form state for each field
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [renewDay, setRenewDay] = useState("");
    const [renewMonth, setRenewMonth] = useState("");
    const [renewYear, setRenewYear] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    function handleSave(e) {
        e.preventDefault();

        // Temporary: no backend right now
        console.log("Saving subscription:", {
            name,
            cost,
            renewalDate: `${renewDay}/${renewMonth}/${renewYear}`,
            category,
            status
        });

        navigate("/dashboard");
    }

    function handleCancel() {
        navigate("/dashboard");
    }

    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
            <h1>Add Subscription</h1>

            <form
            onSubmit={handleSave}
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
                        type="text"
                        placeholder="DD"
                        value={renewDay}
                        onChange={(e) => setRenewDay(e.target.value)}
                        style={{ width: "60px", padding: "10px" }}
                        />
                        <input
                        type="text"
                        placeholder="MM"
                        value={renewMonth}
                        onChange={(e) => setRenewMonth(e.target.value)}
                        style={{ width: "60px", padding: "10px" }}
                        />
                        <input
                        type="text"
                        placeholder="YYYY"
                        value={renewYear}
                        onChange={(e) => setRenewYear(e.target.value)}
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

                {/* Save + Cancel */}
                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button
                    type="submit"
                    style={{ flex: 1, padding: "12px", background: "#28a745", color: "white", border: "none" }}
                    >
                        Save
                    </button>

                    <button
                    type="button"
                    onClick={handleCancel}
                    style={{ flex: 1, padding: "12px", background: "#dc3545", color: "white", border: "none" }}
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
}

export default AddSubscription;