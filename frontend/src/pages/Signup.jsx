import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup=()=>{
    const API=import.meta.env.VITE_API_URL
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [isAdmin, setIsAdmin]=useState(false);
    const [error, setError]=useState("");

    const navigate=useNavigate();

    const handleSignup= async (e)=>{
        e.preventDefault();
        setError("");

        try {
      const res = await fetch(
        `${API}/auth/signup?username=${username}&password=${password}&is_admin=${isAdmin}`,
        { method: "POST",
        headers:{"Content-Type":"application/json",},
        body: JSON.stringify({username,password,is_admin:isAdmin}),
        });

        const data=await res.json();
        if (!res.ok) {
        setError("Username already exists or invalid input");
        return;
      }
      alert("Signup successful!");
      navigate("/login");
    }catch (err){
        console.log(err);
        setError("Server Error");
    }
};

return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
        <div>
            <h2 className="text-xl font-bold mb-6 text-gray-900">Create Account on Taskify</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSignup} className="space-y-4">
                {/*username*/}
                <div>
                    <label className="text-gray-700 font-medium">Username</label>
                    <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter your username"
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
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                {/* isAdmin */}
                <div>
                    <label className="text-gray-700 font-medium">Admin Account?</label>
                    <input
                        type="checkbox"
                        className="h-5 w-5"
                        checked={isAdmin}
                        onChange={(e)=>setIsAdmin(e.target.checked)}
                    />
                </div>
                {/* submit */}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Sign Up
                </button>
                <p className="text-center text-sm text-gray-600 mt-3">
                Already have an account?
                <a href="/login" className="text-blue-600 hover:underline ml-1">
                    Log in
                </a>
                </p>
            </form>
        </div>
    </div>
);
};

export default Signup;