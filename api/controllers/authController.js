import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'
import CustomerModel from '../models/customerModel.js'

import jwt from 'jsonwebtoken'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const __dirname = dirname(currentFilePath)
dotenv.config({ path: path.join(__dirname, '.env') })

// --------------------------------------------------
// API Endpoints
// --------------------------------------------------

async function login(req, res) {
    try {
        const role = req.body.role
        const password = req.body.password
        const currName = req.body.currName

        const user = await EmployeeModel.findOne({ role: role })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const isMatch = await user.comparePassword(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        user.current_user = currName
        await user.save()

        const pc_name = user.pc_name

        const tokenData = {
            _id: user._id,
            role: role,
            pc_name: pc_name,
            type: user.type,
        }

        const token = jwt.sign({ tokenData }, process.env.JWT_SECRET, {
            expiresIn: '365d',
        })

        console.log(user)

        res.cookie('token_888', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({ token, data: { user } })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function logout(req, res) {
    const role = req.body.role
    const user = await EmployeeModel.findOne({ role: role })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    res.clearCookie('token_888')

    res.status(200).json({ message: 'Logged out' })
}

async function getCurrSession(req, res) {
    const token = req.cookies.token_888

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            res.status(200).json(decoded)
        } catch (error) {
            console.error('Error decoding JWT: ', error)
            res.status(500).json({ error: 'Failed to decode JWT' })
        }
    } else {
        res.status(400).json({ error: 'No JWT token found in cookies' })
    }
}

export { login, logout, getCurrSession }
