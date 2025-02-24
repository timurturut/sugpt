import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // New: Prevent flicker

    // Check local storage on page load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        console.log("hit useEffect")
        setLoading(false); // Mark loading as false after checking storage
    }, []);

    // Function to log in
    const login = (credentialResponse) => {
        setUser(credentialResponse);
        localStorage.setItem("user", JSON.stringify(credentialResponse));
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
