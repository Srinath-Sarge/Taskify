import { Link } from "react-router-dom";

const Taskcard = ({ id, title, status, priority, onView }) => {
  return (
    <div onClick={() => onView()}
      className="p-5 bg-white shadow rounded-lg hover:shadow-lg cursor-pointer transition">
      <h3 className="text-lg font-bold">{title}</h3>
      <p>Status: {status}</p>
      <p>Priority: {priority}</p>

      {status!=="cancelled" &&(
      <Link
        to={`/tasks/update/${id}`}
        className="text-blue-600 mt-3 inline-block"
        onClick={(e)=> e.stopPropagation()}
      >
        Edit
      </Link>)}
    </div>
  );
};

export default Taskcard;