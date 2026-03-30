import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/AuthPage.css'

const SEX_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'not_specified', label: 'Prefer not to say' },
]

export default function RegisterPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        biologicalSex: '',
    })
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (!form.biologicalSex) {
            setError('Please select your biological sex.')
            return
        }

        const users = JSON.parse(localStorage.getItem('ht_users') || '[]')
        if (users.find((u) => u.email === form.email)) {
            setError('This email is already registered.')
            return
        }

        const newUser = { ...form, id: Date.now().toString() }
        users.push(newUser)
        localStorage.setItem('ht_users', JSON.stringify(users))
        login(newUser)
        navigate('/dashboard')
    }

    return (
        <div className="auth-page">
            <div className="auth-card auth-card--register">
                <div className="auth-brand">
                    <div className="auth-logo">H</div>
                    <h1 className="auth-title">Health Tracking</h1>
                    <p className="auth-subtitle">Create an account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="field">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>

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
                            minLength={6}
                        />
                    </div>

                    <div className="field">
                        <label>Biological Sex</label>
                        <p className="field-hint">Used to personalize your experience. You can change this later.</p>
                        <div className="sex-options">
                            {SEX_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={`sex-btn ${form.biologicalSex === opt.value ? 'selected' : ''}`}
                                    onClick={() => setForm({ ...form, biologicalSex: opt.value })}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" className="btn-primary">Sign Up</button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Sign in</Link>
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