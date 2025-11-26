import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const API=import.meta.env.VITE_API_URL
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState("");
    const navigate=useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.detail || "Login failed");
            return;
        }

        // Save token
        localStorage.setItem("token", data.access_token);
        const payload=JSON.parse(atob(data.access_token.split(".")[1]));
        if (payload.is_admin){
            navigate("/admin");
        } else{
            navigate("/dashboard");
        }

        alert("Login Successful!");
    } catch (error) {
        alert("Something went wrong.");
        console.error(error);
    }
};


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div>
                <h2 className="text-xl font-bold mb-6 text-gray-900">Login to Taskify</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                {/*username*/}
                <div>
                    <label className="text-gray-700 font-medium">Username</label>
                    <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                        />
                </div>
                {/* password */}
                <div>
                    <label className="text-gray-700 font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                {/* login button */}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Login
                </button>
                <p className="text-center text-sm text-gray-600 mt-3">
                    Don't have an account? <a href="/signup" className="text-blue-600 hover:underline ml-1">Sign up</a>
                </p>
            </form>
            </div>
        </div>
    );
};

export default Login;