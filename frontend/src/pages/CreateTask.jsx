import React, { useEffect, useState } from "react";
import {getUserRole} from "../utils/auth";

const TaskCreate = () => {
  const API=import.meta.env.VITE_API_URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignee, setAssignee] = useState("");
  const [dependency, setDependency] = useState("");

  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const role =getUserRole();

  // Load tasks for dependency dropdown
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API}/tasks/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (Array.isArray(data)) setTasks(data);
    } catch {
      console.log("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const params = new URLSearchParams();
    params.append("title", title);
    params.append("description", description);
    params.append("due_date", dueDate);
    params.append("priority", priority);

    if (assignee) params.append("assignee_id", assignee);
    if (dependency) params.append("dependency_id", dependency);

    const url = `${API}/tasks/?${params.toString()}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Failed to create task");
        return;
      }

      setMessage("Task created successfully!");
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
      setAssignee("");
      setDependency("");

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create Task</h2>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleCreate} className="space-y-4">

        <input
          className="w-full border p-2 rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        {/* Priority Dropdown */}
        <select
          className="w-full border p-2 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Assignee */}
        {role==="admin" && (<input
          className="w-full border p-2 rounded"
          placeholder="Assignee ID (leave empty for self)"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />)}

        {/* Dependency Dropdown */}
        <select
          className="w-full border p-2 rounded"
          value={dependency}
          onChange={(e) => setDependency(e.target.value)}
        >
          <option value="">No Dependency</option>
          {tasks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title} (ID {t.id})
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskCreate;
