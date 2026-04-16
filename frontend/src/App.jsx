import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddSubscription from "./pages/AddSubscription.jsx"
import EditSubscription from "./pages/EditSubscription.jsx"

function App() {
  return (
    // Defines all client side routes for the app
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add" element={<AddSubscription />} />
      <Route path="/edit" element={<EditSubscription />} />
    </Routes>
  );
}

export default App;