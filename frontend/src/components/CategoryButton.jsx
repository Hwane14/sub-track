// Reuseable button for category filtering
// Highlights itself when its category matches the activeCategory
function CategoryButton({ label, value, activeCategory, onClick }) {
    const isActive = activeCategory === value;

    return (
        <button
        onClick={() => onClick(value)}
        style={{
            padding: "8px 12px",
            border: "none",
            cursor: "pointer",
            background: isActive ? "#007bff" : "#eee",
            color: isActive ? "white" : "black",
            borderRadius: "4px"
        }}
        >
            {label}
        </button>
    );
}

export default CategoryButton;