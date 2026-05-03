import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import AuthPage from './pages/AuthPage';

function PrivateApp() {
  const { user, logout } = useAuth();
  if (!user) return <AuthPage />;
  return (
    <BrowserRouter>
      <div className="max-w-6xl mx-auto p-6 space-y-4">
        <header className="card flex justify-between"><h1 className="text-2xl font-bold">Crypto Tracker Pro</h1><nav className="space-x-4"><Link to="/">Dashboard</Link><Link to="/portfolio">Portfolio</Link><button onClick={logout}>Logout</button></nav></header>
        <Routes><Route path="/" element={<Dashboard />} /><Route path="/portfolio" element={<Portfolio />} /><Route path="*" element={<Navigate to="/" />} /></Routes>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return <AuthProvider><PrivateApp /></AuthProvider>;
}
