import { useAuth } from "@/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";



export const ProtectedRoute = ()=>{
    const {isAuthenticated} = useAuth();
    return (
        isAuthenticated? <Outlet/> : <Navigate to="/sign-in" replace />
    )
}

export const AnonymousRoute = ()=>{
    const {isAuthenticated} = useAuth();
    return(
        isAuthenticated? <Navigate to="/"/> : <Outlet/> 
    )
}
