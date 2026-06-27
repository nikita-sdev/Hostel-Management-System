import { Navigate } from "react-router-dom";

const ProtectedRoute= ({children, role})=>{
  const token= localStorage.getItem("token");
  const user= JSON.parse(localStorage.getItem("user"));

  if(!token){
    return <Navigate to="/login"></Navigate>
  }

  if(role!==user.role){
    return <Navigate to="/"></Navigate>
  }

  return children;

}

export default ProtectedRoute;