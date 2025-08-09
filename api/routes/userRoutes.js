import express from 'express'

import {
    testGet,
    testPost,
    getCurrUser,
    getCustomer,
    addNewCategory,
    addNewProduct,
    getCategory,
    getCategoryId,
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
    deleteCategory,
    deleteProduct,
    updateCustomer,
    updateProfile,
    updatePassword,
    updateAdmin,
    promoteAdmin,
    demoteAdmin,
    addToCart,
    removeFromCart,
    updateProductQuantity,
    addToWishlist,
    removeFromWishlist,
    createOrder,
    getCart,
    getWishlist,
    emptyCart,
    getOrders,
    getSearchResults,
    updateSettings,
    saveMarketingEmail,
    getSettings,
    getMarketingEmail,
    sendMarketingEmail,
    sendSupportEmail,
    getProductBySku,
} from '../controllers/userController.js'

import { isRestricted } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/test-get', isRestricted, testGet)
router.post('/test-post', isRestricted, testPost)

router.get('/get-marketing-email', isRestricted, getMarketingEmail)
router.get('/get-settings', getSettings)
router.get('/get-user/:id', getCurrUser)
router.get('/get-customer/:id', isRestricted, getCustomer)
router.get('/get-orders/:id', getOrders)
router.get('/get-category/:id', getCategory)
router.get('/get-category-id/:name', getCategoryId)
router.get('/get-categories', getCategories)
router.get('/get-products', getProducts)
router.get('/get-product/:id', getProduct)
router.get('/get-product-by-sku/:sku', getProductBySku)
router.get('/get-category-products/:id', getCategoryProducts)
router.get('/get-carousel', getCarouselProducts)
router.get('/get-customers', isRestricted, getCustomers)
router.get('/get-admins', isRestricted, getAdmins)
router.get('/get-super-admins', isRestricted, getSuperAdmins)
router.get('/get-cart/:id', getCart)
router.get('/get-wishlist/:id', getWishlist)
router.get('/get-search-results/:query', getSearchResults)
router.put('/update-category/:id', isRestricted, updateCategory)
router.put('/update-product/:id', isRestricted, updateProduct)
router.put('/update-customer/:id', isRestricted, updateCustomer)
router.put('/update-profile/:id', updateProfile)
router.put('/update-password/:id', updatePassword)
router.put('/update-admin/:id', isRestricted, updateAdmin)
router.put('/promote-admin/:id', isRestricted, promoteAdmin)
router.put('/demote-admin/:id', isRestricted, demoteAdmin)
router.put('/update-product-quantity/:id', isRestricted, updateProductQuantity)
router.put('/update-settings', isRestricted, updateSettings)
router.post('/add-category', isRestricted, addNewCategory)
router.post('/add-product', isRestricted, addNewProduct)
router.post('/add-to-cart/:id', addToCart)
router.post('/remove-from-cart/:id', removeFromCart)
router.post('/add-to-wishlist/:id', addToWishlist)
router.post('/remove-from-wishlist/:id', removeFromWishlist)
router.post('/create-order/:id', createOrder)
router.post('/empty-cart/:id', emptyCart)
router.post('/save-marketing-email', isRestricted, saveMarketingEmail)
router.post('/send-marketing-email', isRestricted, sendMarketingEmail)
router.post('/send-support-email', sendSupportEmail)
router.delete('/delete-category/:id', isRestricted, deleteCategory)
router.delete('/delete-product/:id', isRestricted, deleteProduct)
router.delete('/delete-customer/:id', isRestricted, deleteCustomer)
router.delete('/delete-admin/:id', isRestricted, deleteAdmin)
router.delete('/delete-super-admin/:id', isRestricted, deleteSuperAdmin)

export default router
