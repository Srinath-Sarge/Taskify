import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const AdminRoute=({children})=>{
    const role=getUserRole();
    console.log("AdminRoute role:", role);
    if (role!=="admin"){
        console.log("Access denied: User is not an admin.");
        return <Navigate to="/dashboard" replace/>;
    }
    console.log("Access granted: User is an admin.");
    return children;
};
export default AdminRoute;