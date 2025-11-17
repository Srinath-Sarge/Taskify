import React from "react";
import logo from "../assets/1.png";
import { handleLogout } from "../utils/logout";
import { getUsername, getUserRole } from "../utils/auth";

const Navbar = () => {
  const username = getUsername();
  const role = getUserRole() || "user";

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      <div className="flex items-center gap-3">
        <img src={logo} alt="Taskify Logo" className="h-14 w-13 object-contain" />
        <h1 className="text-2xl font-bold text-blue-600">Taskify</h1>
      </div>

      <div className="flex items-center gap-4">
        {username && (
          <span className="text-gray-700 font-semibold">
            Hello {username}!!!
          </span>
        )}
      </div>

      <div className="flex items-center gap-6">
        <button href ="/dashboard" className="text-gray-700 hover:text-blue-600 transition">Dashboard</button>
        {/* <button className="text-gray-700 hover:text-blue-600 transition">Tasks</button> */}
        <a href="/create-task" className="px-5 py-3 hover:bg-gray-100">
          Create Task
        </a>
        <button 
          onClick={handleLogout} 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
