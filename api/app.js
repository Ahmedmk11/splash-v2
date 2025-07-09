import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import fetch from 'node-fetch'

import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import uploadRoutes from './routes/imageRoutes.js'

import { connectToDatabase } from './database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

app.use(
    cors({
        origin: [process.env.CLIENT_URL],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
)
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use('/images', express.static('images'))

app.use('/upload', uploadRoutes)
app.use('/user', userRoutes)
app.use('/auth', authRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

connectToDatabase().then(() => {
    console.log('=====================================================')

    function keepAwake() {
        fetch(process.env.SERVER_URL).catch(() => {})
        const nextDelay = (Math.random() * 4 + 1) * 60 * 1000
        setTimeout(keepAwake, nextDelay)
    }

    keepAwake()
})
