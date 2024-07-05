import express from 'express'

import {
    login,
    logout,
    registerAdmin,
    registerCustomer,
    getCurrSession,
} from '../controllers/authController.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/register-customer', registerCustomer)
router.post('/register-admin', registerAdmin)

router.get('/get-curr-session', getCurrSession)

export default router
