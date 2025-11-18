import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";
import CreateTask from "./pages/CreateTask";
import TaskUpdate from "./pages/TaskUpdate";
import AdminTaskDashboard from "./pages/AdminTaskDashboard";
import AdminManageUsers from "./pages/AdminManageUsers";

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

        
        {/* admin route */}
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
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout>
                  <AdminManageUsers />
                </AdminLayout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tasks"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout>
                  <AdminTaskDashboard />
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
        
        
        {/* users route */}
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