import { useEffect, useState } from "react";

const AdminManageUsers = () => {
  
  const API=import.meta.env.VITE_API_URL
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const [showRequestModal, setShowRequestModal]=useState(false);

  const fetchUsers = async () => {
    const res = await fetch(`${API}/users/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    setUsers(data);
  };

  const toggleAdmin = async (id, makeAdmin) => {
    const res = await fetch(
      `${API}/users/set_admin/${id}?admin=${makeAdmin}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (res.ok) fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    const res = await fetch(`${API}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) fetchUsers();
  };
  const AdminRequestsModal = ({ onClose, token }) => {
      const [requests, setRequests] = useState([]);

      const loadRequests = async () => {
        const res = await fetch(
          `${API}/users/admin/requests`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setRequests(data);
      };

      useEffect(() => {
        loadRequests();
      }, []);

      const handleApprove = async (id) => {
        await fetch(
          `${API}/users/admin/requests/${id}?action=approve`,
          { method: "PUT", headers: { Authorization: `Bearer ${token}` } }
        );
        loadRequests();
      };

      const handleReject = async (id) => {
        await fetch(
          `${API}/users/admin/requests/${id}?action=reject`,
          { method: "PUT", headers: { Authorization: `Bearer ${token}` } }
        );
        loadRequests();
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Admin Access Requests</h2>

            {requests.length === 0 ? (
              <p className="text-gray-500">No pending requests.</p>
            ) : (
              <div className="space-y-4">
                {requests.map((u) => (
                  <div key={u.id} className="p-3 border rounded">
                    <p className="font-medium">{u.username}</p>

                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => handleApprove(u.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(u.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-6 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
  );
};


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <button onClick={()=>setShowRequestModal(true)}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-600" >
        Admin Requests
      </button>
      {showRequestModal &&(
        <AdminRequestsModal
          onClose={()=>setShowRequestModal(false)}
          token={localStorage.getItem("token")}
        />
      )}

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Username</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-3">{u.id}</td>
              <td className="p-3">{u.username}</td>
              <td className="p-3">{u.is_admin ? "Admin" : "User"}</td>

              <td className="p-3 flex gap-3">

                {u.is_admin ? (
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => toggleAdmin(u.id, false)}
                  >
                    Remove Admin
                  </button>
                ) : (
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded"
                    onClick={() => toggleAdmin(u.id, true)}
                  >
                    Make Admin
                  </button>
                )}

                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageUsers;
