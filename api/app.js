import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { Server as IOServer } from 'socket.io'

import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import uploadRoutes from './routes/imageRoutes.js'

import { connectToDatabase } from './database.js'
import CategoryModel from './models/categoryModel.js'

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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/images', express.static('images'))
app.use('/upload', uploadRoutes)
app.use('/user', userRoutes)
app.use('/auth', authRoutes)

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

const io = new IOServer(server, {
    cors: {
        origin: [process.env.CLIENT_URL],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
})

const categoryChangeStream = CategoryModel.watch()

categoryChangeStream.on('change', (change) => {
    io.emit('categoryCollectionChange', change)
})

connectToDatabase().then(() => {
    console.log('=====================================================')
})
