import express from 'express'

import {
    login,
    logout,
    registerAdmin,
    registerCustomer,
    getCurrSession,
    verifyEmail,
    resendEmail,
} from '../controllers/authController.js'

const router = express.Router()

router.get('/verify-email', verifyEmail)
router.post('/resend-email', resendEmail)
router.post('/login', login)
router.post('/logout', logout)
router.post('/register-customer', registerCustomer)
router.post('/register-admin', registerAdmin)

router.get('/get-curr-session', getCurrSession)

export default router
