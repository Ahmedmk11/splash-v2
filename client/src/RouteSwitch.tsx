import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import axiosApi from './utils/axiosApi'

import Login from './pages/Login.tsx'
import NotFound from './pages/NotFound.tsx'
import Home from './pages/Home.tsx'
import Forbidden from './pages/Forbidden.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import SuperAdminDashboard from './pages/SuperAdminDashboard.tsx'

import Bedrooms from './pages/categories/Bedrooms.tsx'
import LivingRooms from './pages/categories/LivingRooms.tsx'
import DiningRooms from './pages/categories/DiningRooms.tsx'
import TVUnits from './pages/categories/TVUnits.tsx'
import Dressings from './pages/categories/Dressings.tsx'
import Receptions from './pages/categories/Receptions.tsx'
import InteriorDesign from './pages/categories/InteriorDesign.tsx'

import {
    UserGuard,
    LoginGuard,
    AdminGuard,
    SuperAdminGuard,
} from './Guards.tsx'
import SignUp from './pages/SignUp.tsx'

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
            .catch(() => {
                console.log('Not Authenticated')
                setIsAuthenticated(false)
            })
    }, [location])

    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/bedrooms" element={<Bedrooms />} />
            <Route path="/living-rooms" element={<LivingRooms />} />
            <Route path="/dining-rooms" element={<DiningRooms />} />
            <Route path="/tv-units" element={<TVUnits />} />
            <Route path="/dressings" element={<Dressings />} />
            <Route path="/receptions" element={<Receptions />} />
            <Route path="/interior-design" element={<InteriorDesign />} />

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
