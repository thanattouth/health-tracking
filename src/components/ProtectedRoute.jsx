import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }) {
    const { user } = useAuth()
    return user ? children : <Navigate to="/login" />
}

export function FemaleRoute({ children }) {
    const { user } = useAuth()
    if (!user) return <Navigate to="/login" />
    if (user.biologicalSex !== 'female') return <Navigate to="/dashboard" />
    return children
}