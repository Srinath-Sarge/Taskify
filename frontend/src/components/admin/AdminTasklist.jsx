import { useEffect, useState } from "react";
import AdminTaskcard from "./AdminTaskcard";

const AdminTaskList = () => {
  const API=import.meta.env.VITE_API_URL
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await fetch(`${API}/tasks/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setTasks(data);
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {tasks.map((t) => (
        <AdminTaskcard key={t.id} task={t} onDelete={deleteTask} />
      ))}
    </div>
  );
};

export default AdminTaskList;
