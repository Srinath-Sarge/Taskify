import Sidebar from "../components/Sidebar";
import Taskcard from "../components/Taskcard";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  return (
    <div className="flex">

      {/* Sidebar */}
      <Navbar />

      {/* Main admin area */}
      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

        {/* Admin Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          <Taskcard 
            title="Total Users" 
            status="42" 
            priority="Info" 
          />

          <Taskcard 
            title="Pending Tasks" 
            status="18" 
            priority="Warning" 
          />

          <Taskcard 
            title="Overdue Tasks" 
            status="5" 
            priority="High" 
          />
        </div>

        {/* Admin Options */}
        <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>

        <div className="grid grid-cols-2 gap-6">

          <div className="p-6 border rounded-xl shadow bg-white">
            <h3 className="text-lg font-bold mb-2">Manage Users</h3>
            <p className="text-gray-600 mb-4">
              View, edit or remove user accounts.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Open Users Panel
            </button>
          </div>

          <div className="p-6 border rounded-xl shadow bg-white">
            <h3 className="text-lg font-bold mb-2">Task Overview</h3>
            <p className="text-gray-600 mb-4">
              See all tasks and update their status.
            </p>
            <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
              View Tasks
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
