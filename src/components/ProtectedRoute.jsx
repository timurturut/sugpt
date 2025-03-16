import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const ProtectedRoute = ({ element }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // Prevents premature redirects

    if (!user) return <Navigate to="/" replace />;

    return element;
};

export default ProtectedRoute;