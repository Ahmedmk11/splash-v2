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
} from '../controllers/userController.js'

const router = express.Router()

router.get('/test-get', testGet)
router.post('/test-post', testPost)

router.get('/get-marketing-email', getMarketingEmail)
router.get('/get-settings', getSettings)
router.get('/get-user/:id', getCurrUser)
router.get('/get-customer/:id', getCustomer)
router.get('/get-orders/:id', getOrders)
router.get('/get-category/:id', getCategory)
router.get('/get-category-id/:name', getCategoryId)
router.get('/get-categories', getCategories)
router.get('/get-products', getProducts)
router.get('/get-product/:id', getProduct)
router.get('/get-category-products/:id', getCategoryProducts)
router.get('/get-carousel', getCarouselProducts)
router.get('/get-customers', getCustomers)
router.get('/get-admins', getAdmins)
router.get('/get-super-admins', getSuperAdmins)
router.get('/get-cart/:id', getCart)
router.get('/get-wishlist/:id', getWishlist)
router.get('/get-search-results/:query', getSearchResults)
router.put('/update-category/:id', updateCategory)
router.put('/update-product/:id', updateProduct)
router.put('/update-customer/:id', updateCustomer)
router.put('/update-profile/:id', updateProfile)
router.put('/update-password/:id', updatePassword)
router.put('/update-admin/:id', updateAdmin)
router.put('/promote-admin/:id', promoteAdmin)
router.put('/demote-admin/:id', demoteAdmin)
router.put('/update-product-quantity/:id', updateProductQuantity)
router.put('/update-settings', updateSettings)
router.post('/add-category', addNewCategory)
router.post('/add-product', addNewProduct)
router.post('/add-to-cart/:id', addToCart)
router.post('/remove-from-cart/:id', removeFromCart)
router.post('/add-to-wishlist/:id', addToWishlist)
router.post('/remove-from-wishlist/:id', removeFromWishlist)
router.post('/create-order/:id', createOrder)
router.post('/empty-cart/:id', emptyCart)
router.post('/save-marketing-email', saveMarketingEmail)
router.post('/send-marketing-email', sendMarketingEmail)
router.delete('/delete-category/:id', deleteCategory)
router.delete('/delete-product/:id', deleteProduct)
router.delete('/delete-customer/:id', deleteCustomer)
router.delete('/delete-admin/:id', deleteAdmin)
router.delete('/delete-super-admin/:id', deleteSuperAdmin)

export default router
