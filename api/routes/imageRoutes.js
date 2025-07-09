import express from 'express'
import {
    uploadProduct,
    uploadCategory,
    uploadMarketing,
    uploadLogo,
} from '../middleware/upload.js'
import { uploadImageToGitHub } from '../utils/githubUploader.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Product image upload (multiple files)
router.post('/product', uploadProduct, async (req, res) => {
    if (req.files && req.files.length > 0) {
        const filePaths = []

        try {
            for (const file of req.files) {
                const localPath = file.path
                const githubPath = `api/images/products/${file.filename}`

                await uploadImageToGitHub(
                    localPath,
                    githubPath,
                    `Add product image ${file.filename}`
                )

                filePaths.push(`/images/products/${file.filename}`)

                // Optional: delete local file
                // fs.unlinkSync(localPath)
            }

            res.status(200).json({
                success: true,
                message: 'Product images uploaded and pushed to GitHub!',
                filePaths,
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'One or more images failed to upload: ' + err.message,
            })
        }
    } else {
        res.status(400).json({ success: false, message: 'No files selected!' })
    }
})

// Category image upload (single file)
router.post('/category', uploadCategory, async (req, res) => {
    if (req.file) {
        const localPath = req.file.path
        const githubPath = `api/images/categories/${req.file.filename}`

        try {
            await uploadImageToGitHub(
                localPath,
                githubPath,
                `Add category image ${req.file.filename}`
            )

            res.status(200).json({
                success: true,
                message: 'Category image uploaded and pushed to GitHub!',
                filePath: `/images/categories/${req.file.filename}`,
            })

            // Optional: delete local file
            // fs.unlinkSync(localPath)
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Upload failed: ' + err.message,
            })
        }
    } else {
        res.status(400).json({ success: false, message: 'No file selected!' })
    }
})

// Marketing image upload (single file)
router.post('/marketing', uploadMarketing, async (req, res) => {
    if (req.file) {
        const localPath = req.file.path
        const githubPath = `api/images/marketing/${req.file.filename}`

        try {
            await uploadImageToGitHub(
                localPath,
                githubPath,
                `Add marketing image ${req.file.filename}`
            )

            res.status(200).json({
                success: true,
                message: 'Marketing image uploaded and pushed to GitHub!',
                filePath: `/images/marketing/${req.file.filename}`,
            })

            // Optional: delete local file
            // fs.unlinkSync(localPath)
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Upload failed: ' + err.message,
            })
        }
    } else {
        res.status(400).json({ success: false, message: 'No file selected!' })
    }
})

// Logo image upload (single file)
router.post('/logo', uploadLogo, async (req, res) => {
    if (req.file) {
        const localPath = req.file.path
        const githubPath = `api/images/logo/${req.file.filename}`

        try {
            await uploadImageToGitHub(
                localPath,
                githubPath,
                `Add logo image ${req.file.filename}`
            )

            res.status(200).json({
                success: true,
                message: 'Logo image uploaded and pushed to GitHub!',
                filePath: `/images/logo/${req.file.filename}`,
            })

            // Optional: delete local file
            // fs.unlinkSync(localPath)
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Upload failed: ' + err.message,
            })
        }
    } else {
        res.status(400).json({ success: false, message: 'No file selected!' })
    }
})

export default router
