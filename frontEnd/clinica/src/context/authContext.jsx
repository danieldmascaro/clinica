import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('access') || null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/');
    };

    const refreshAccessToken = async () => {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) {
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/jwt/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access', data.access);
                setToken(data.access);
            } else {
                console.warn('Refresh token inválido. Cerrando sesión.');
                logout();
            }
        } catch (error) {
            console.error('Error al refrescar el token:', error);
            logout();
        }
    };

    const fetchUserDetails = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/users/me/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else if (response.status === 401) {
                console.warn('Access token expirado. Intentando refrescar...');
                await refreshAccessToken(); 
            } else {
                console.error('Error al obtener los datos del usuario');
                setUser(null);
            }
        } catch (error) {
            console.error('Error inesperado al obtener el usuario:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserDetails();
        }
        const interval = setInterval(() => {
            refreshAccessToken();
        }, 4*60*1000)
        return () => clearInterval(interval);
    }, [token]);
    const tipoUsuario = user?.tipo_usuario || null;
    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, logout, tipoUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};
export {AuthProvider, useAuth};



