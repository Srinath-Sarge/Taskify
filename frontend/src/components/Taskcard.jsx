export default function Taskcard({title,status,priority}) {
    return (
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2"> {title}</h3>
            {/* <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Description:</span> {description}</p> */}
            <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Status:</span> {status}</p>
            <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Priority:</span> {priority}</p>
        </div>
    );
}