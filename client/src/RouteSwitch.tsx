import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import NotFound from './pages/NotFound.tsx'

const RouteSwitch = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default RouteSwitch
