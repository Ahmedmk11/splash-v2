import express from 'express'

import {
    getCurrUser,
    addNewCategory,
    addNewProduct,
    getCategory,
    getCategories,
    getProducts,
    getProduct,
    getCategoryProducts,
    getCarouselProducts,
    updateCategory,
    updateProduct,
} from '../controllers/userController.js'

const router = express.Router()

router.get('/get-user/:id', getCurrUser)
router.get('/get-category/:id', getCategory)
router.get('/get-categories', getCategories)
router.get('/get-products', getProducts)
router.get('/get-product/:id', getProduct)
router.get('/get-category-products/:id', getCategoryProducts)
router.get('/get-carousel', getCarouselProducts)
router.post('/add-category', addNewCategory)
router.post('/add-product', addNewProduct)
router.put('/update-category/:id', updateCategory)
router.put('/update-product/:id', updateProduct)

export default router
