import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    // Tracks inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Stores validation error to display to the user
    const [error, setError] = useState("");
    // React Router hook for programmatic navigation
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault(); // Stops the page from refreshing on submission

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        // TEMPORARY: mock login
        navigate("/dashboard");
    }

    return (
        <div style={{ maxWidth: "400px", margin: "80px auto", textAlign: "center" }}>
            <h1>Login</h1>

            <form 
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}
            >
                {/* Only displays error message when error state is not empty */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Each field updates its corresponding state on every keystroke */}
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "10px", fontSize: "16px" }}
                />

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}                
                style={{ padding: "10px", fontSize: "16px" }}
                />

                <button
                type="submit"
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                }}
                >
                    Login
                </button>
            </form>
            <p style={{ marginTop: "10px", color: "#888" }}>
                Don't have an account? <span style={{ textDecoration: "underline" }}>Sign up</span>
            </p>
        </div>
    );
}

export default Login;