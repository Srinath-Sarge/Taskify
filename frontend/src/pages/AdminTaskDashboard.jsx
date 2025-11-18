import { useEffect, useState } from "react";
import AdminTaskcard from "../components/admin/AdminTaskcard";

const AdminTaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:8000/tasks/", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    setTasks(data);
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    const res = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Tasks</h1>

      <div className="grid grid-cols-3 gap-6">
        {tasks.map((task) => (
          <AdminTaskcard key={task.id} task={task} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
};

export default AdminTaskDashboard;
