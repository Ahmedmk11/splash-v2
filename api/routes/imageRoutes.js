import express from 'express'
import { uploadProduct, uploadCategory } from '../middleware/upload.js'

const router = express.Router()

// Product image upload route
router.post('/product', uploadProduct, (req, res) => {
    if (req.file) {
        res.status(200).json({
            success: true,
            message: 'Product image uploaded!',
            filePath: `/images/products/${req.file.filename}`,
        })
    } else {
        res.status(400).json({ success: false, message: 'No file selected!' })
    }
})

// Category image upload route
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

export default router
