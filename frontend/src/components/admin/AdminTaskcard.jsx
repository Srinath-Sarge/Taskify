import { Link } from "react-router-dom";

const AdminTaskcard = ({ task, onDelete }) => {
  return (
    <div className="relative p-5 bg-white shadow rounded-lg hover:shadow-lg transition">

      {task.is_overdue && (
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          Overdue
        </span>
      )}

      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>

      <div className="flex gap-4 mt-4">
        <Link
          to={`/admin/tasks/update/${task.id}`}
          className="text-blue-600 font-medium"
        >
          Edit
        </Link>

        <button
          className="text-red-600 font-medium"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>

    </div>
  );
};

export default AdminTaskcard;
