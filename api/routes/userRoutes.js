import express from 'express'

import { getCurrUser } from '../controllers/userController.js'

const router = express.Router()

router.get('/get-user/:id', getCurrUser)

export default router
