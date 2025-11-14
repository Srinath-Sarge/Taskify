import React from "react";
import logo from "../assets/1.png";

const Navbar=()=>{
    return (
        <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <img src={logo} alt="Taskify Logo" className="h-14 w-13 object-contain"/>
                <h1 className="text-2xl font-bold text-blue-600">Taskify</h1>
            </div>

            {/* Right Menu */}
            <div className="flex items-center gap-6">
                <button className="text-gray-700 hover:text-blue-600 transition">Dashboard</button>
                <button className="text-gray-700 hover:text-blue-600 transition">Tasks</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Logout</button>
            </div>
        </nav>
    )
};
export default Navbar;