import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ element, requireAdmin = false }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // Prevents premature redirects

    if (!user) return <Navigate to="/login" replace />;

    if(requireAdmin) {
        try {
            const decodedToken = jwtDecode(user);
            const userRole = decodedToken.role;

            if (userRole !== "admin") {
                return <Navigate to="/" replace/>;
            }
        } catch (error) {
            console.error("Invalid token:", error);
            return <Navigate to="/" replace/>;
        }
    }

    return element;
};

export default ProtectedRoute;