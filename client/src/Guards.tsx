import React from 'react'
import { Navigate } from 'react-router-dom'

interface GuardInterface {
    isAuthenticated: boolean | null
    type: string | null
    children: React.ReactNode
}

const AdminGuard = ({ isAuthenticated, type, children }: GuardInterface) => {
    if (isAuthenticated != null || type != null) {
        if (isAuthenticated && type === 'Admin') {
            return children
        } else if (!isAuthenticated) {
            return <Navigate to="/login" />
        } else if (type !== 'Admin') {
            return <Navigate to="/forbidden-access" />
        }
    }
}

const SuperAdminGuard = ({
    isAuthenticated,
    type,
    children,
}: GuardInterface) => {
    if (isAuthenticated != null || type != null) {
        if (isAuthenticated && type === 'Super Admin') {
            return children
        } else if (!isAuthenticated) {
            return <Navigate to="/login" />
        } else if (type !== 'Super Admin') {
            return <Navigate to="/forbidden-access" />
        }
    }
}

const LoginGuard = ({
    isAuthenticated,
    children,
}: {
    isAuthenticated: boolean | null
    children: React.ReactNode
}) => {
    if (!isAuthenticated) {
        return children
    } else {
        return <Navigate to="/" />
    }
}

const UserGuard = ({
    isAuthenticated,
    children,
}: {
    isAuthenticated: boolean | null
    children: React.ReactNode
}) => {
    if (isAuthenticated != null) {
        if (isAuthenticated) {
            return children
        } else if (!isAuthenticated) {
            return <Navigate to="/login" />
        }
    }
}

export { AdminGuard, SuperAdminGuard, LoginGuard, UserGuard }
