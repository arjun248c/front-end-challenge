import { createContext, useContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, getCurrentUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { user } = await authLogin(email, password);
        setUser(user);
        return user;
    };

    const logout = () => {
        authLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
