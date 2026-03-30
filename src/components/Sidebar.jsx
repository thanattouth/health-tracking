// src/components/Sidebar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
    LayoutDashboard, Smile, Moon,
    Utensils, Activity, Settings, LogOut, X
} from 'lucide-react'

export default function Sidebar({ isOpen, onClose }) {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/mood', label: 'Mood', icon: <Smile size={20} /> },
        { path: '/sleep', label: 'Sleep', icon: <Moon size={20} /> },
        { path: '/meal', label: 'Meal', icon: <Utensils size={20} /> },
        { path: '/exercise', label: 'Exercise', icon: <Activity size={20} /> },
    ]

    return (
        <>
            {/* Overlay สำหรับตอนเปิดเมนูบนมือถือ */}
            {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-brand">
                    <div className="sidebar-logo">H</div>
                    <h2>HealthTrack</h2>
                    {/* ปุ่มปิดเมนูบนมือถือ */}
                    <button className="btn-close-sidebar" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={onClose} // ปิดเมนูเมื่อกดเลือกลิงก์บนมือถือ
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-bottom">
                    <Link to="/settings" className="nav-item">
                        <Settings size={20} />
                        Settings
                    </Link>
                    <button onClick={handleLogout} className="btn-logout">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    )
}