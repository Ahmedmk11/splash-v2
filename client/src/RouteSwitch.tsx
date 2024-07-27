import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login.tsx'
import NotFound from './pages/NotFound.tsx'
import Home from './pages/Home.tsx'
import Forbidden from './pages/Forbidden.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import SuperAdminDashboard from './pages/SuperAdminDashboard.tsx'

import { LoginGuard, AdminGuard, SuperAdminGuard } from './Guards.tsx'
import SignUp from './pages/SignUp.tsx'

import CurrUserContext from './CurrUserContext.tsx'
import Category from './pages/Category.tsx'

const RouteSwitch = () => {
    const { isAuthenticated, adminType } = useContext(CurrUserContext)

    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/category-:categoryId" element={<Category />} />

            <Route path="/forbidden-access" element={<Forbidden />} />
            <Route path="/" element={<Home />} />

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

            <Route
                path="/sign-up"
                element={
                    <LoginGuard isAuthenticated={isAuthenticated}>
                        <SignUp />
                    </LoginGuard>
                }
            />

            {/* ---------------------------------------------------- */}
            {/* Admin */}
            {/* ---------------------------------------------------- */}

            <Route
                path="/admin-dashboard"
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
                path="/super-admin-dashboard"
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
