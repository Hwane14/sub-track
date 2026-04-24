import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import AuthForm from "../components/AuthForm";

function Register() {
    // Tracks inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Stores validation error to display to the user
    const [error, setError] = useState("");
    // React Router hook for programmatic navigation
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault(); // Stops the page from refreshing on submission

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const res = await registerUser(email, password);
            navigate("/");
        } catch (err) {
            // Show backend error message if available
            setError(err.response?.data?.error || "Registration failed.")
        }
    }

    return (
        <AuthForm
        title="Create Account"
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        error={error}
        onSubmit={handleSubmit}
        buttonText="Register"
        bottomText="Already have an account?"
        bottomLinkText="Log in"
        onBottomLinkClick={() => navigate("/")}
        />
    );
}

export default Register;