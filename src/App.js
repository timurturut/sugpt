import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./components/MainScreen";
import ProfScreen from "./components/ProfScreen";
import LoginScreen from "./components/LoginScreen";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <GoogleOAuthProvider clientId="616977821764-6gsebd1u9k40k8jq40h9qra6upesh2ka.apps.googleusercontent.com">
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginScreen />} />
                        <Route path="/chat" element={<ProtectedRoute element={<MainScreen />} />} />
                        <Route path="/admin" element={<ProtectedRoute element={<ProfScreen />} />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
