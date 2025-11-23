import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TaskUpdate = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchTask = async () => {
    try {
      const res = await fetch("https://taskify-production-ea73.up.railway.app/tasks/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const t = data.find((item) => item.id === parseInt(id));
      setTask(t);

      if (t) {
        setStatus(t.status);
        setPriority(t.priority);
      }

    } catch (err) {
      setError("Error loading task");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const params = new URLSearchParams();

    if (status) params.append("status", status);
    if (priority) params.append("priority", priority);

    const url = `https://taskify-production-ea73.up.railway.app/tasks/${id}?${params.toString()}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Update failed");
        return;
      }

      setMessage("Task updated successfully!");

    } catch (err) {
      setError("Server or network error");
    }
  };

  if (!task) return <p className="p-8">Loading task…</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Update Task</h1>

      {message && <p className="text-green-600 mb-3">{message}</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">

        <div>
          <label className="font-medium">Task Title</label>
          <p className="p-2 bg-gray-100 border rounded">{task.title}</p>
        </div>

        <div>
          <label className="font-medium">Status</label>
          <select
  className="border px-3 py-2 rounded w-full"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  {task.is_overdue ? (
    <>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </>
  ) : (
    <>
      {status === "pending" && (
        <>
          <option value="pending">Pending (current)</option>
          <option value="in_progress">In Progress</option>
          <option value="cancelled">Cancel</option>
        </>
      )}
      {status === "in_progress" && (
        <>
          <option value="in_progress">In Progress (current)</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancel</option>
        </>
      )}
      {status === "completed" && <option value="completed">Completed</option>}
      {status === "cancelled" && <option value="cancelled">Cancelled</option>}
    </>
  )}
</select>

        </div>

        <div>
          <label className="font-medium">Priority</label>
          <select
            className="w-full p-2 border rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Task
        </button>

      </form>
    </div>
  );
};

export default TaskUpdate;
