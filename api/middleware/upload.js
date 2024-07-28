import multer from 'multer'
import path from 'path'
import fs from 'fs'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

const productFilename = (req, file, cb) => {
    cb(null, file.originalname)
}

const categoryFilename = (req, file, cb) => {
    cb(null, file.originalname)
}

const uploadProduct = multer({
    storage: createStorage('products', productFilename),
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
}).single('image')

const uploadCategory = multer({
    storage: createStorage('categories', categoryFilename),
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
}).single('image')

export { uploadProduct, uploadCategory }
