import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

import { connectToDatabase } from './database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

app.use(express.json())
app.use(
    cors({
        origin: [process.env.CLIENT_URL],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
)
app.use(cookieParser())

app.use('/user', userRoutes)
app.use('/auth', authRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

connectToDatabase().then(() => {
    console.log('=====================================================')
})
