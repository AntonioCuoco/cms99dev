import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Login from "../pages/login/Login";

const ProtectedRoutes = () => {
    const isVerified = useSelector(state => state.loginSlice.isVerified);
    // const navigate = useNavigate();

    if(isVerified === true) {
        return <Outlet />
    } else if (isVerified === false) {
        return <Navigate to="/login"/>
    }
}
export default ProtectedRoutes;