import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


export const UserLayout=({ children })=>{
  return (
    <div>
      <Navbar />
      <div className="p-5">{children}</div>
    </div>
  );
};

export const AdminLayout=({ children })=>{
  console.log("Admin layout loaded");
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-5 w-full">{children}</div>
    </div>
  );
};