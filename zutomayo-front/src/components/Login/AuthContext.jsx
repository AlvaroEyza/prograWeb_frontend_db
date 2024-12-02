import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem('userRole');
    });

    const login = (role) => {
        setIsAuthenticated(true);
        setUserRole(role);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);
    };

    const logout = async () => {
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        await emptyCart(); 
    };

    const emptyCart = async () => {
        const payload = { method: 'DELETE' };
        await fetch('https://zutomayo-2024-backend.azurewebsites.net/carrito', payload);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);