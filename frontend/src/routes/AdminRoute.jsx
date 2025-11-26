import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const AdminRoute=({children})=>{
    const role=getUserRole();
    if (role!=="admin"){
        console.log("Access denied: User is not an admin.");
        return <Navigate to="/dashboard" replace/>;
    }
    return children;
};
export default AdminRoute;