import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'

import CustomerModel from '../models/customerModel.js'
import AdminModel from '../models/adminModel.js'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const __dirname = dirname(currentFilePath)
dotenv.config({ path: path.join(__dirname, '.env') })

// --------------------------------------------------
// API Endpoints
// --------------------------------------------------

async function getCurrUser(req, res) {
    try {
        const { id } = req.params
        const customer = await CustomerModel.findById(id)
        const admin = await AdminModel.findById(id)

        if (!customer && !admin) {
            return res.status(404).json({ message: 'User not found' })
        }

        const user = customer || admin
        console.log(user)
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

export { getCurrUser }
