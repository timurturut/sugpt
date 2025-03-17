import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./components/MainScreen";
import ProfScreen from "./components/ProfScreen";
import LoginScreen from "./components/LoginScreen";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <GoogleOAuthProvider clientId="886851848733-vc3geef30ojiljbegrbu2133jf7sar0s.apps.googleusercontent.com">
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/" element={<ProtectedRoute element={<MainScreen />} />} />
                        <Route path="/admin" element={<ProtectedRoute element={<ProfScreen />} requireAdmin={true} />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
