import React, { useEffect, useState } from "react";
import Taskcard from "../components/Taskcard";
import DescView from "../components/TaskDescription";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewTask, setViewTask] = useState(null);

 const fetchTasks = async () => {
  setLoading(true);
  setError("");

  const token = localStorage.getItem("token");
  if (!token) {
    setError("No auth token found. Please login.");
    setLoading(false);
    return;
  }

  try {
    let url = "http://127.0.0.1:8000/tasks/";
    const params = new URLSearchParams();
    if (statusFilter) params.append("status", statusFilter);
    if (priorityFilter) params.append("priority", priorityFilter);
    if (params.toString()) url += "?" + params.toString();

    console.log("Fetching:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("Tasks response status:", res.status);

    const raw = await res.text();
    console.log("Raw response body:", raw);

    let data;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch (parseErr) {
      console.warn("Response is not JSON:", parseErr);
      data = raw;
    }

    if (res.status === 401) {
      setError("Unauthorized. Please login again.");
      localStorage.removeItem("token");
      setTasks([]);
      return;
    }

    if (!res.ok) {
      console.warn("Non-OK response for tasks:", data);
      setError(
        (data && (data.detail || data.message)) ||
        `Server returned ${res.status}`
      );
      setTasks([]);
      return;
    }

    if (!Array.isArray(data)) {
      console.error("Tasks payload is not an array:", data);
      setError("Invalid tasks data received from server.");
      setTasks([]);
      return;
    }

    setTasks(data);
  } catch (err) {
    console.error("Network or unexpected error:", err);
    setError("Network error or server unavailable.");
    setTasks([]);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter]);
  if (!Array.isArray(tasks)) {
  console.error("Invalid response:", tasks);
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
      <p className="text-red-600">Error loading tasks. Please try again.</p>
    </div>
  );
}

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        <select
          className="border px-3 py-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">Filter by Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button
          onClick={fetchTasks}
          className="ml-2 bg-blue-600 text-white px-4 rounded"
        >
          Refresh
        </button>
      </div>

      {loading && <p>Loading tasks…</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* TASK LIST */}
      <div className="grid grid-cols-3 gap-6">
        {!loading && tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <Taskcard
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              priority={task.priority}
              is_overdue={task.is_overdue}
              onView={()=>setViewTask(task)}
            />

          ))
        )}
      </div>
      <DescView task={viewTask} onClose={() => setViewTask(null)} />
    </div>
  );
};

export default Dashboard;
