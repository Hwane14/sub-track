// This file connect the ReactJS frontend to the Node Express backend 
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true // allows cookies to be sent so session-based login works
});

// AUTH
export const loginUser = (email, password) =>
    API.post("/auth/login", { email, password });
/* for later
export const registerUser = (email, password) =>
    API.post("/auth/register", { email, password });
*/

// Subscriptions
export const getSubscriptions = () => API.get("/subscriptions");