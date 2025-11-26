import { Link } from "react-router-dom";

const Taskcard = ({ id, title, status, priority,is_overdue, onView }) => {
  return (
    <div onClick={() => onView()}
      className="relative p-5 bg-white shadow rounded-lg hover:shadow-lg cursor-pointer border border-blue-600 transition">
      {is_overdue && (
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          Overdue
        </span>
      )}
      <h3 className="text-lg font-bold">{title}</h3>
      <p>Status: {status}</p>
      <p>Priority: {priority}</p>

      {status!=="cancelled" && status!=="completed" &&(
      <Link
        to={`/tasks/update/${id}`}
        className="text-blue-600 mt-3 inline-block hover:text-green-700"
        onClick={(e)=> e.stopPropagation()}
      >
        Edit
      </Link>)}
    </div>
  );
};

export default Taskcard;