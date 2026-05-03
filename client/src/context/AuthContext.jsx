import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  const saveAuth = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (payload) => saveAuth((await api.post('/auth/login', payload)).data);
  const register = async (payload) => saveAuth((await api.post('/auth/register', payload)).data);
  const logout = () => { localStorage.clear(); setUser(null); };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
