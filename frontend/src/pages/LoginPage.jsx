import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/AuthPage.css'

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        const users = JSON.parse(localStorage.getItem('ht_users') || '[]')
        const found = users.find(
            (u) => u.email === form.email && u.password === form.password
        )
        if (!found) {
            setError('Invalid email or password.')
            return
        }
        login(found)
        navigate('/dashboard')
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <div className="auth-logo">H</div>
                    <h1 className="auth-title">Health Tracking</h1>
                    <p className="auth-subtitle">Welcome back</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" className="btn-primary">Sign In</button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>

            <div className="auth-visual">
                <div className="visual-content">
                    <p className="visual-quote">"Good health starts with knowing yourself."</p>
                    <div className="feature-pills">
                        <span className="pill pill-mood">Mood</span>
                        <span className="pill pill-sleep">Sleep</span>
                        <span className="pill pill-meal">Meal</span>
                        <span className="pill pill-exercise">Exercise</span>
                    </div>
                </div>
            </div>
        </div>
    )
}