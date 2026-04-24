// This file connect the ReactJS frontend to the Node Express backend 
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true // allows cookies to be sent so session-based login works
});

// Authentication API endpoints
export const loginUser = (email, password) =>
    API.post("/auth/login", { email, password });
export const registerUser = (email, password) =>
    API.post("/auth/register", { email, password });


// Subscription API endpoints
export const getSubscriptions = () => 
    API.get("/subscriptions"); // get subscriptions for logged-in user
export const createSubscription = (data) => 
    API.post("/subscriptions", data); // add subscription for logged-in user
export const updateSubscription = (id, data) =>
    API.put(`/subscriptions/${id}`, data); // update subscription for logged-in user
export const deleteSubscription = (id) =>
    API.delete(`/subscriptions/${id}`); // delete subscription