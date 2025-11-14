import Sidebar from "../components/Sidebar";
import Taskcard from "../components/Taskcard";
import Navbar from "../components/Navbar";

function Dashboard(){
  return (
    <div className="flex">
      {/* <Navbar /> */}
      <Sidebar />

      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Card Grid */}
        <div className="grid grid-cols-3 gap-6">
          <Taskcard title="Frontend UI" status="In Progress" priority="High" />
          <Taskcard title="API Integration" status="Pending" priority="Medium" />
          <Taskcard title="Fix Bugs" status="Completed" priority="Low" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;