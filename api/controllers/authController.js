import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

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

            if (!user.email_verified) {
                return res.status(403).json({
                    message: 'Please verify your email address first',
                })
            }
        }

        const token = jwt.sign({ tokenData }, process.env.JWT_SECRET, {
            expiresIn: '365d',
        })

        console.log(user)

        res.cookie('token_splash', token, {
            httpOnly: true,
            secure: true,
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

async function verifyEmail(req, res) {
    const { token } = req.query

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const customer = await CustomerModel.findOneAndUpdate(
            { email_address: decoded.email },
            { email_verified: true }
        )

        if (!customer) {
            return res.status(400).send('Invalid token or customer not found.')
        }

        res.send(`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 10px;">
                <h2 style="color: #333333;">Email Verified Successfully</h2>
                <p style="color: #555555; font-size: 16px;">
                    Thank you for verifying your email! Your account is now active.
                </p>
                <p style="margin-top: 20px;">
                    <a href="${
                        process.env.CLIENT_URL
                    }" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                        Go to Home
                    </a>
                </p>
                <p style="color: #999999; font-size: 12px; margin-top: 20px;">
                    © ${new Date().getFullYear()} Splash. All rights reserved.
                </p>
            </div>
        `)
    } catch (error) {
        res.status(400).send('Invalid or expired token.')
    }
}

async function sendEmail(email) {
    const logoUrl = await getSettingsHelper()

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })

    const verificationUrl = `${process.env.SERVER_URL}/auth/verify-email?token=${verificationToken}`

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${
                    process.env.SERVER_URL + logoUrl
                }" alt="Splash" style="max-width: 150px; height: auto;">
            </div>
            <h2 style="color: #333333; text-align: center;">Verify Your Email Address</h2>
            <p style="color: #555555; font-size: 16px; text-align: center;">
                Thank you for signing up! To complete your registration, please verify your email address by clicking the button below.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" style="background-color: #007bff; color: #ffffff; padding: 15px 30px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                    Verify Email
                </a>
            </div>
            <p style="color: #999999; font-size: 12px; text-align: center;">
                If you did not sign up for this account, you can ignore this email.
            </p>
            <p style="color: #999999; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} Splash. All rights reserved.
            </p>
        </div>
        `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error)
        } else {
            console.log('Verification email sent:', info.response)
        }
    })
}

async function resendEmail(req, res) {
    const { email } = req.body

    try {
        sendEmail(email)
    } catch (error) {
        console.error('Error resending email:', error)
        return res.status(500).json({ message: error.message })
    }
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

        sendEmail(newCustomer.email_address)

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

async function forgotPasswordEmail(req, res) {
    const logoUrl = await getSettingsHelper()

    const { email_address } = req.body

    try {
        const customer = await CustomerModel.findOne({ email_address })

        if (!customer) {
            return res.status(404).json({ message: 'User not found' })
        }

        const loginToken = jwt.sign({ email_address }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })

        const loginUrl = `${process.env.SERVER_URL}/auth/login-with-token?token=${loginToken}`

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        })

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email_address,
            subject: 'Login Link',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="${
                        process.env.SERVER_URL + logoUrl
                    }" alt="Splash" style="max-width: 150px; height: auto;">
                </div>
                <h2 style="color: #333333; text-align: center;">Login to Your Account</h2>
                <p style="color: #555555; font-size: 16px; text-align: center;">
                    You are receiving this email because you requested to log in directly to your account.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${loginUrl}" style="background-color: #007bff; color: #ffffff; padding: 15px 30px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                        Login
                    </a>
                </div>
                <p style="color: #999999; font-size: 12px; text-align: center;">
                    If you did not request this, you can ignore this email.
                </p>
                <p style="color: #999999; font-size: 12px; text-align: center;">
                    © ${new Date().getFullYear()} Splash. All rights reserved.
                </p>
            </div>
            `,
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error)
            } else {
                console.log('Login link email sent:', info.response)
            }
        })

        return res.status(200).json({ message: 'Login link email sent' })
    } catch (error) {
        console.error('Error sending login link email:', error)
        return res.status(500).json({ message: error.message })
    }
}

async function loginWithToken(req, res) {
    const { token } = req.query

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const customer = await CustomerModel.findOne({
            email_address: decoded.email_address,
        })
        const admin = await AdminModel.findOne({
            email_address: decoded.email_address,
        })

        if (!customer && !admin) {
            return res.status(404).json({ message: 'User not found' })
        }

        const user = customer || admin

        const tokenData = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email_address: user.email_address,
            phone_number: user.phone_number,
            type: user.type,
            email_verified: user.email_verified,
        }

        const authToken = jwt.sign({ tokenData }, process.env.JWT_SECRET, {
            expiresIn: '365d',
        })

        res.cookie('token_splash', authToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })

        res.send(`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; background-color: #f9f9f9; border: 1px solid #dddddd; border-radius: 10px;">
                <h2 style="color: #333333;">Logged In Successfully</h2>
                <p style="color: #555555; font-size: 16px;">
                    You have been logged in successfully. Welcome back!
                </p>
                <p style="margin-top: 20px;">
                    <a href="${
                        process.env.CLIENT_URL
                    }" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                        Go to Home
                    </a>
                </p>
                <p style="color: #999999; font-size: 12px; margin-top: 20px;">
                    © ${new Date().getFullYear()} Splash. All rights reserved.
                </p>
            </div>
        `)
    } catch (error) {
        console.error('Error logging in with token: ', error)
        return res.status(500).json({ message: error.message })
    }
}

export {
    login,
    logout,
    registerCustomer,
    registerAdmin,
    getCurrSession,
    verifyEmail,
    resendEmail,
    forgotPasswordEmail,
    loginWithToken,
}
