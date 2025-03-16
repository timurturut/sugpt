import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check local storage on page load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);


    const login = async (credentialResponse) => {
        try {
            const loginResponse = await axios.post("http://localhost:8080/login", {}, {
                headers: {
                    Authorization: `Bearer ${credentialResponse}`
                }
            });

            const jwtToken = loginResponse?.token
            setUser(jwtToken);
            localStorage.setItem("user", JSON.stringify(jwtToken));
        } catch (error) {
            console.error("Login failed:", error);
        }
    };


    // Function to log out
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    if (loading) return <div>Loading...</div>; // Prevents UI flickering

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
