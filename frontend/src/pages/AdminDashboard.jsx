import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState(0);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await fetch("http://127.0.0.1:8000/users/all", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    setUsers(data.length);
  };

  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:8000/tasks/", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const pending = tasks.filter(t => t.status === "pending").length;
  const overdue = tasks.filter(t => t.is_overdue).length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="p-5 bg-white shadow rounded-lg">
          <h3 className="text-lg font-bold">Total Users</h3>
          <p className="text-xl mt-2">{users}</p>
        </div>

        <div className="p-5 bg-white shadow rounded-lg">
          <h3 className="text-lg font-bold">Total Tasks</h3>
          <p className="text-xl mt-2">{totalTasks}</p>
        </div>

        <div className="p-5 bg-white shadow rounded-lg">
          <h3 className="text-lg font-bold">Pending Tasks</h3>
          <p className="text-xl mt-2">{pending}</p>
        </div>

        <div className="p-5 bg-white shadow rounded-lg">
          <h3 className="text-lg font-bold">Overdue Tasks</h3>
          <p className="text-xl mt-2 text-red-600">{overdue}</p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
