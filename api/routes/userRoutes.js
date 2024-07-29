import express from 'express'

import {
    testGet,
    testPost,
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
    getCustomers,
    getAdmins,
    getSuperAdmins,
    deleteCustomer,
    deleteAdmin,
    deleteSuperAdmin,
} from '../controllers/userController.js'

const router = express.Router()

router.get('/test-get', testGet)
router.post('/test-post', testPost)

router.get('/get-user/:id', getCurrUser)
router.get('/get-category/:id', getCategory)
router.get('/get-categories', getCategories)
router.get('/get-products', getProducts)
router.get('/get-product/:id', getProduct)
router.get('/get-category-products/:id', getCategoryProducts)
router.get('/get-carousel', getCarouselProducts)
router.get('/get-customers', getCustomers)
router.get('/get-admins', getAdmins)
router.get('/get-super-admins', getSuperAdmins)
router.post('/add-category', addNewCategory)
router.post('/add-product', addNewProduct)
router.put('/update-category/:id', updateCategory)
router.put('/update-product/:id', updateProduct)
// router.delete('/delete-category/:id', deleteCategory)
// router.delete('/delete-product/:id', deleteProduct)
router.delete('/delete-customer/:id', deleteCustomer)
router.delete('/delete-admin/:id', deleteAdmin)
router.delete('/delete-super-admin/:id', deleteSuperAdmin)

export default router
