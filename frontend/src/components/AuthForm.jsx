// Reusable authentication form used by both Login and Register pages
function AuthForm({
    title,
    email,
    password,
    setEmail,
    setPassword,
    error,
    onSubmit,
    buttonText,
    bottomText,
    bottomLinkText,
    onBottomLinkClick
}) {
    return (
        <div style={{ maxWidth: "400px", margin: "80px auto", textAlign: "center" }}>
            <h1>{title}</h1>

            <form 
            onSubmit={onSubmit}
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
                required
                />

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}                
                style={{ padding: "10px", fontSize: "16px" }}
                required
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
                    {buttonText}
                </button>
            </form>

            <p style={{ marginTop: "10px" }}>
                {bottomText}{" "} 
                <span
                style={{ color: "#007bff", textDecoration: "underline", cursor: "pointer" }}
                onClick={onBottomLinkClick}
                >
                    {bottomLinkText}
                </span>
            </p>
        </div>
    );
}

export default AuthForm;