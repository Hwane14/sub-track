function Login() {
    return (
        <div style={{ maxWidth: "400px", margin: "80px auto", textAlign: "center" }}>
            <h1>Login</h1>

            <form style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20ps" }}>
                <input
                type="email"
                placeholder="Email"
                style={{ padding: "10px", fontSize: "16px" }}
                />

                <input
                type="password"
                placeholder="Password"
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
        </div>
    );
}

export default Login;