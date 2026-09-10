import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Protected = ({ children, role }) => {

    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (loading) {
        return <div>Loading...</div>
    }

    // User login nahi hai
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Role required hai aur user ka role match nahi karta
    if (role && user.role !== role) {
        if (user.role === 'seller') {
            return <Navigate to="/seller/dashboard" replace />
        }

        if (user.role === 'buyer') {
            return <Navigate to="/" replace />
        }

        return <Navigate to="/login" replace />
    }

    return children
}

export default Protected