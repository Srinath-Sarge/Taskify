import { handleLogout } from "../utils/logout";
import { getUsername } from "../utils/auth";

export default function Sidebar() {
  const username=getUsername();
  return (
    <div className="w-56 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      
      {/* Logo Section */}
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-2xl font-semibold tracking-wide text-gray-800">
          Taskify
        </h2>
        <p>Hello {username}!!!</p>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex flex-col">
        <a
          href="/admin"
          className="px-5 py-3 text-gray-700 hover:bg-green-100 hover:text-gray-900 transition"
        >
          Dashboard
        </a>
        
        <a
          href="/admin/tasks"
          className="px-5 py-3 text-gray-700 hover:bg-green-100 hover:text-gray-900 transition"
        >
          My Tasks
        </a>
        <a href="/admin/tasks/create" className="px-5 py-3 text-gray-700 hover:bg-green-100 hover:text-gray-900 transition">
          Create Task
        </a>


        <a
          href="/admin/users"
          className="px-5 py-3 text-gray-700 hover:bg-green-100 hover:text-gray-900 transition"
        >
          Manage Users
        </a>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-5 w-full px-5">
        <button onClick={handleLogout} className="text-red-500 hover:text-red-600 text-sm">
          Logout
        </button>
      </div>
    </div>
  );
}
