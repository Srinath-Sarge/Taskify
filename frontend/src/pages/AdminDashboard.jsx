import Taskcard from "../components/Taskcard";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <Taskcard title="Total Users" status="42" priority="Info" />
        <Taskcard title="Pending Tasks" status="18" priority="Warning" />
        <Taskcard title="Overdue Tasks" status="5" priority="High" />
      </div>
    </div>
  );
};

export default AdminDashboard;
