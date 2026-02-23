import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAllowed, redirectPath = "/login-admin" }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;