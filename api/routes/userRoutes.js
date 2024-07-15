import express from 'express'

import {
    getCurrUser,
    addNewCategory,
    addNewProduct,
    getCategory,
    getCategoryProducts,
} from '../controllers/userController.js'

const router = express.Router()

router.get('/get-user/:id', getCurrUser)
router.get('/get-category/:id', getCategory)
router.get('/get-category-products/:id', getCategoryProducts)
router.post('/add-category', addNewCategory)
router.post('/add-product', addNewProduct)

export default router
