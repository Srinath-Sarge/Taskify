import { useEffect, useState } from "react";

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await fetch("http://127.0.0.1:8000/users/all", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    setUsers(data);
  };

  const toggleAdmin = async (id, makeAdmin) => {
    const res = await fetch(
      `http://127.0.0.1:8000/users/set_admin/${id}?admin=${makeAdmin}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (res.ok) fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    const res = await fetch(`http://127.0.0.1:8000/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

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
