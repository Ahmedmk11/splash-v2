import express from 'express'
import {
    uploadProduct,
    uploadCategory,
    uploadMarketing,
    uploadLogo,
} from '../middleware/upload.js'

const router = express.Router()

// Product image upload (multiple files)
router.post('/product', uploadProduct, (req, res) => {
    if (req.files && req.files.length > 0) {
        const filePaths = req.files.map(
            (file) => `/images/products/${file.filename}`
        )

        res.status(200).json({
            success: true,
            message: 'Product images uploaded!',
            filePaths,
        })
    } else {
        res.status(400).json({ success: false, message: 'No files selected!' })
    }
})

// Category image upload (single file)
router.post('/category', uploadCategory, (req, res) => {
    if (req.file) {
        res.status(200).json({
            success: true,
            message: 'Category image uploaded!',
            filePath: `/images/categories/${req.file.filename}`,
        })
    } else {
        res.status(400).json({ success: false, message: 'No file selected!' })
    }
})

// Marketing image upload (single file)
router.post('/marketing', uploadMarketing, (req, res) => {
    if (req.file) {
        res.status(200).json({
            success: true,
            message: 'Marketing image uploaded!',
            filePath: `/images/marketing/${req.file.filename}`,
        })
    } else {
        res.status(400).json({ success: false, message: 'No file selected!' })
    }
})

// Logo upload (single file)
router.post('/logo', uploadLogo, (req, res) => {
    if (req.file) {
        res.status(200).json({
            success: true,
            message: 'Logo uploaded!',
            filePath: `/images/logo/${req.file.filename}`,
        })
    } else {
        res.status(400).json({ success: false, message: 'No file selected!' })
    }
})

export default router
