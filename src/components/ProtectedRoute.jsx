import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const ProtectedRoute = ({ element }) => {
    const { user } = useAuth();

    if (user === null) {
        // If no user is found, redirect to log in
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;