import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut, LayoutDashboard, Package, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius)',
        textDecoration: 'none',
        color: 'var(--text-muted)',
        transition: 'all 0.2s',
    };

    const activeNavStyle = {
        ...navStyle,
        backgroundColor: 'var(--primary)',
        color: 'white',
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar (Desktop) */}
            <aside style={{
                width: '260px',
                borderRight: '1px solid var(--border)',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100%',
                zIndex: 10,
                left: 0,
                top: 0
            }}>

                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>Slooz Admin</h2>
                </div>

                <nav style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {user?.role === 'manager' && (
                        <NavLink to="/dashboard" style={({ isActive }) => isActive ? activeNavStyle : navStyle}>
                            <LayoutDashboard size={20} />
                            Dashboard
                        </NavLink>
                    )}

                    <NavLink to="/products" style={({ isActive }) => isActive ? activeNavStyle : navStyle}>
                        <Package size={20} />
                        Products
                    </NavLink>
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                {user?.name?.charAt(0)}
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <p style={{ fontSize: '0.875rem', fontWeight: '500', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.name}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role}</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={toggleTheme} className="btn" style={{ flex: 1, border: '1px solid var(--border)' }}>
                            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <button onClick={handleLogout} className="btn" style={{ flex: 1, border: '1px solid var(--border)', color: '#ef4444' }}>
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: '260px', padding: '2rem', width: 'calc(100% - 260px)' }}>
                <Outlet />
            </main>
        </div>
    );
}
