// TODO: implement forgot password, verify email address, uncomment email verification check

import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import CustomerModel from '../models/customerModel.js'
import AdminModel from '../models/adminModel.js'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const __dirname = dirname(currentFilePath)
dotenv.config({ path: path.join(__dirname, '.env') })

// --------------------------------------------------
// API Endpoints
// --------------------------------------------------

async function login(req, res) {
    try {
        const customer = await CustomerModel.findOne({
            email_address: req.body.email_address,
        })
        const admin = await AdminModel.findOne({
            email_address: req.body.email_address,
        })

        if (!customer && !admin) {
            return res.status(404).json({ message: 'User not found' })
        }

        const user = customer || admin

        const isMatch = await user.comparePassword(
            req.body.password,
            user.password
        )
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        await user.save()

        let tokenData = {}

        if (admin) {
            tokenData = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email_address: user.email_address,
                phone_number: user.phone_number,
                type: user.type,
            }
        }

        if (customer) {
            tokenData = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email_address: user.email_address,
                phone_number: user.phone_number,
                email_verified: user.email_verified,
            }

            // if (!user.email_verified) {
            //     return res.status(403).json({
            //         message: 'Please verify your email address first',
            //     })
            // }
        }

        const token = jwt.sign({ tokenData }, process.env.JWT_SECRET, {
            expiresIn: '365d',
        })

        console.log(user)

        res.cookie('token_splash', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({ token, data: { user } })
    } catch (error) {
        console.error('Error logging in: ', error)
        return res.status(500).json({ message: error.message })
    }
}

async function logout(req, res) {
    res.clearCookie('token_splash')
    res.status(200).json({ message: 'Logged out' })
}

async function registerCustomer(req, res) {
    try {
        console.log(req.body)
        const customer = await CustomerModel.findOne({
            email_address: req.body.email_address,
        })

        if (customer) {
            return res
                .status(400)
                .json({ message: 'Email address is already used.' })
        }

        const newCustomer = new CustomerModel(req.body)

        await newCustomer.save()

        return res.status(201).json({ data: newCustomer })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function registerAdmin(req, res) {
    try {
        const admin = await AdminModel.findOne({
            email_address: req.body.email_address,
        })

        if (admin) {
            return res
                .status(400)
                .json({ message: 'Email address is already used.' })
        }

        const newAdmin = new AdminModel(req.body)

        await newAdmin.save()

        return res.status(201).json({ data: newAdmin })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function getCurrSession(req, res) {
    const token = req.cookies.token_splash

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

export { login, logout, registerCustomer, registerAdmin, getCurrSession }
