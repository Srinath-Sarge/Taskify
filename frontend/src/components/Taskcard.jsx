import { Link } from "react-router-dom";

const Taskcard = ({ id, title, status, priority }) => {
  return (
    <div className="p-4 shadow rounded-lg bg-white">
      <h3 className="text-lg font-bold">{title}</h3>
      <p>Status: {status}</p>
      <p>Priority: {priority}</p>

      <Link
        to={`/tasks/update/${id}`}
        className="text-blue-600 mt-3 inline-block"
      >
        Edit
      </Link>
    </div>
  );
};

export default Taskcard;