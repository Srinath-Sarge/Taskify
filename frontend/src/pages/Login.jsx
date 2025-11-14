import React, {useState} from "react";

const Login=()=>{
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");

    const handleLogin=(e)=>{
        e.preventDefault();
        console.log("Login clicked: ",username,password);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div>
                <h2 className="text-xl font-bold mb-6 text-gray-900">Login to Taskify</h2>
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