import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login.tsx'
import NotFound from './pages/NotFound.tsx'
import Home from './pages/Home.tsx'
import Forbidden from './pages/Forbidden.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import SuperAdminDashboard from './pages/SuperAdminDashboard.tsx'
import Cart from './pages/Cart.tsx'
import Wishlist from './pages/Wishlist.tsx'
import Activity from './pages/Activity.tsx'

import {
    UserGuard,
    LoginGuard,
    AdminGuard,
    SuperAdminGuard,
} from './Guards.tsx'
import SignUp from './pages/SignUp.tsx'

import CurrUserContext from './CurrUserContext.tsx'
import Category from './pages/Category.tsx'
import Account from './pages/Account.tsx'

const RouteSwitch = () => {
    const { isAuthenticated, adminType } = useContext(CurrUserContext)

    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/category/:categoryId" element={<Category />} />

            <Route path="/forbidden-access" element={<Forbidden />} />
            <Route path="/" element={<Home />} />

            {/* ---------------------------------------------------- */}
            {/* Authenticated */}
            {/* ---------------------------------------------------- */}

            <Route
                path="/account"
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <Account />
                    </UserGuard>
                }
            />

            <Route
                path="/cart"
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <Cart />
                    </UserGuard>
                }
            />

            <Route
                path="/wishlist"
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <Wishlist />
                    </UserGuard>
                }
            />

            <Route
                path="/activity/:cid"
                element={
                    <UserGuard isAuthenticated={isAuthenticated}>
                        <Activity />
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
