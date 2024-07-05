import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import axiosApi from './utils/axiosApi'

import Login from './pages/Login.tsx'
import NotFound from './pages/NotFound.tsx'
import Home from './pages/Home.tsx'
import Forbidden from './pages/Forbidden.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import SuperAdminDashboard from './pages/SuperAdminDashboard.tsx'

import {
    UserGuard,
    LoginGuard,
    AdminGuard,
    SuperAdminGuard,
} from './Guards.tsx'

const RouteSwitch = () => {
    const location = useLocation()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const [adminType, setAdminType] = useState<string | null>(null)

    useEffect(() => {
        axiosApi
            .get('/auth/get-curr-session')
            .then((res: any) => {
                if (res.data.tokenData) {
                    setIsAuthenticated(true)
                    if (res.data.tokenData.type) {
                        setAdminType(res.data.tokenData.type)
                    }
                } else {
                    setIsAuthenticated(false)
                    setAdminType(null)
                }
            })
            .catch((err: Error) => {
                console.log(err)
                setIsAuthenticated(false)
            })
    }, [location])

    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/forbidden-access" element={<Forbidden />} />

            {/* ---------------------------------------------------- */}
            {/* Authenticated */}
            {/* ---------------------------------------------------- */}

            <Route
                path="/"
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <Home />
                    </UserGuard>
                }
            />

            {/* ---------------------------------------------------- */}
            {/* Not Authenticated */}
            {/* ---------------------------------------------------- */}

            <Route
                path="/login"
                element={
                    <LoginGuard isAuthenticated={isAuthenticated}>
                        <Login />
                    </LoginGuard>
                }
            />

            {/* ---------------------------------------------------- */}
            {/* Admin */}
            {/* ---------------------------------------------------- */}

            <Route
                path="/admin"
                element={
                    <AdminGuard
                        isAuthenticated={isAuthenticated}
                        type={adminType}
                    >
                        <AdminDashboard />
                    </AdminGuard>
                }
            />

            {/* ---------------------------------------------------- */}
            {/* Super Admin */}
            {/* ---------------------------------------------------- */}

            <Route
                path="/super-admin"
                element={
                    <SuperAdminGuard
                        isAuthenticated={isAuthenticated}
                        type={adminType}
                    >
                        <SuperAdminDashboard />
                    </SuperAdminGuard>
                }
            />
        </Routes>
    )
}

export default RouteSwitch
