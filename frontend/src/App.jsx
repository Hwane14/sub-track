import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddSubscription from "./pages/AddSubscription.jsx"
import EditSubscription from "./pages/EditSubscription.jsx"
import Notifications from "./pages/Notifications.jsx"

function App() {
  return (
    // Defines all client side routes for the app
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add" element={<AddSubscription />} />
      <Route path="/edit/:id" element={<EditSubscription />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}

export default App;