import express from 'express'

import {
    login,
    logout,
    registerCustomer,
    getCurrSession,
} from '../controllers/authController.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/register-customer', registerCustomer)
router.post('/register-admin', registerAdmin)

router.get('/session', getCurrSession)

export default router
