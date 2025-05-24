import React, { useState} from "react";
import apiClient from "../api";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the useUser hook


const Login = () => {   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser(); // Get the setUser function from the context
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("login/", { email, password });
             console.log(response.data); // Log the response data for debugging
             if(response.data.success === false) {
                setError("Error ! Invalid email or password.");
                return;
             }
             setUser(response.data.data); // Set the user data in the context
            //  user = response.data.data; // Extract user data from the response
            //  console.log(user); // Log the user data for debugging
             localStorage.setItem("token", response.data.data.token); // Store the token in local storage
             localStorage.setItem("user_id", response.data.data.id); // Store user ID in local storage
             //localStorage.setItem("user", JSON.stringify(response.data.data)); // Store user data in local storage
            // const name = response.data.data.name;
            navigate('/dashboard'); // Redirect to the home page after successful login
        } catch (err) {
            setError("Error ! Invalid email or password.");
        }
    };
    
    return (
        
        <div className="login-box">
        <h2>Login</h2>
        <div id="face">😐</div>
        {error && <p className="error">{error}</p>}
        <form id="loginForm" onSubmit={handleSubmit}>
            <div className="input-box">
            <label></label>
            <input
                 id="username"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="input-box">
            <label></label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit" id="loginBtn">Login</button>
        </form>
        </div>
    );
}
export default Login;