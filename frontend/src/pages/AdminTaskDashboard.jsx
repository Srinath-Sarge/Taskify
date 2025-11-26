import { useEffect, useState } from "react";
import AdminTaskcard from "../components/admin/AdminTaskcard";
import DescView from "../components/TaskDescription";

const AdminTaskDashboard = () => {
  const API=import.meta.env.VITE_API_URL
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const [viewTask, setViewTask]=useState(null);

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
        {tasks.length===0 ? (
          <p>No Tasks Found!!!</p>
        ):(tasks.map((task) => (
          <AdminTaskcard key={task.id} 
              task={task} 
              onDelete={deleteTask}
              onView={()=>setViewTask(task)} />
        )))}
      </div>
      <DescView task={viewTask} onClose={()=>setViewTask(null)}/>
    </div>
  );
};

export default AdminTaskDashboard;
