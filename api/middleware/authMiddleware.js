import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const __dirname = dirname(currentFilePath)

dotenv.config({ path: path.join(__dirname, '../.env') })

const isRestricted = (req, res, next) => {
    const token = req.cookies.token_splash

    if (!token) {
        return res.status(404).json({ message: 'Not Found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = decoded.tokenData

        const admin = user.type

        if (admin) {
            return next()
        } else {
            return res.status(404).json({ message: 'Not Found' })
        }
    } catch (error) {
        return res.status(404).json({ message: 'Not Found' })
    }
}

export { isRestricted }
