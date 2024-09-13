import express from 'express'

import {
    login,
    logout,
    registerAdmin,
    registerCustomer,
    getCurrSession,
    verifyEmail,
    resendEmail,
    forgotPasswordEmail,
    loginWithToken,
} from '../controllers/authController.js'

const router = express.Router()

router.get('/get-curr-session', getCurrSession)
router.get('/verify-email', verifyEmail)
router.get('/login-with-token', loginWithToken)
router.post('/resend-email', resendEmail)
router.post('/login', login)
router.post('/logout', logout)
router.post('/register-customer', registerCustomer)
router.post('/register-admin', registerAdmin)
router.post('/forgot-password-email', forgotPasswordEmail)

export default router
