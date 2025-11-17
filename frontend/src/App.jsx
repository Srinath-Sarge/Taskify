import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";
import CreateTask from "./pages/CreateTask";
import TaskUpdate from "./pages/TaskUpdate";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import { AdminLayout, UserLayout } from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />


        {/* LOGIN & SIGNUP PAGE */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserLayout>
                <Dashboard />
              </UserLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tasks/create"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout>
                  <CreateTask />
                </AdminLayout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tasks/update/:id"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout>
                  <TaskUpdate />
                </AdminLayout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <UserLayout>
                <CreateTask />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/update/:id"
          element={
            <ProtectedRoute>
              <UserLayout>
                <TaskUpdate />
              </UserLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;