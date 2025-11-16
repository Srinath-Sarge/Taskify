export const getUserRole = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return "user"; 
    
    const parts = token.split(".");
    if (parts.length !== 3) return "user";

    const payload = JSON.parse(atob(parts[1]));
    return payload.is_admin ? "admin" : "user";
  } catch (err) {
    console.error("Role decode failed:", err);
    return "user"; 
  }
};


export const getUsername=()=>{
    const token=localStorage.getItem("token");
    if (!token) return null;
    try{
        const payload=JSON.parse(atob(token.split(".")[1]));
        return payload.sub;
    }
    catch(error){
        return null;
    }
};