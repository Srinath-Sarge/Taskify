import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState("");
    const navigate=useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://127.0.0.1:8000/auth/login", {
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

        alert("Login Successful!");
        window.location.href = "/dashboard"; // redirect
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
            </form>
            </div>
        </div>
    );
};

export default Login;