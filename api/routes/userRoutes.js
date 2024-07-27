import express from 'express'

import {
    getCurrUser,
    addNewCategory,
    addNewProduct,
    getCategory,
    getCategories,
    getCategoryProducts,
    getCarouselProducts,
} from '../controllers/userController.js'

const router = express.Router()

router.get('/get-user/:id', getCurrUser)
router.get('/get-category/:id', getCategory)
router.get('/get-categories', getCategories)
router.get('/get-category-products/:id', getCategoryProducts)
router.get('/get-carousel', getCarouselProducts)
router.post('/add-category', addNewCategory)
router.post('/add-product', addNewProduct)

export default router
