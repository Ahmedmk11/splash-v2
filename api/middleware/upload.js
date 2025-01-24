import multer from 'multer'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const randomFilename = (req, file, cb) => {
    const randomString = crypto.randomBytes(16).toString('hex')
    const extension = path.extname(file.originalname)
    const filename = `${randomString}${extension}`

    cb(null, filename)
}

const createStorage = (folder, filenameFunction) =>
    multer.diskStorage({
        destination: function (req, file, cb) {
            const dir = path.join(__dirname, '..', 'images', folder)
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true })
            }
            cb(null, dir)
        },
        filename: filenameFunction,
    })

const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    )
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Error: Images Only!')
    }
}

// Configuration for handling multiple images for product
const uploadProduct = multer({
    storage: createStorage('products', randomFilename),
    limits: { fileSize: 10000000 }, // Max file size 10MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
}).array('images', 10) // <-- Handling multiple files (up to 10)

const uploadCategory = multer({
    storage: createStorage('categories', randomFilename),
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
}).single('image')

const uploadMarketing = multer({
    storage: createStorage('marketing', randomFilename),
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
}).single('image')

const uploadLogo = multer({
    storage: createStorage('logo', randomFilename),
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
}).single('image')

export { uploadProduct, uploadCategory, uploadMarketing, uploadLogo }
