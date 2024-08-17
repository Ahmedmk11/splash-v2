import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

import CustomerModel from '../models/customerModel.js'
import AdminModel from '../models/adminModel.js'
import CategoryModel from '../models/categoryModel.js'
import ProductModel from '../models/productModel.js'
import OrderModel from '../models/orderModel.js'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const __dirname = dirname(currentFilePath)
dotenv.config({ path: path.join(__dirname, '.env') })

// --------------------------------------------------
// API Endpoints
// --------------------------------------------------

async function testGet(req, res) {
    try {
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function testPost(req, res) {
    try {
        // const newCustomer = new CustomerModel({
        //     email_address: 'ajh@t.com',
        //     password: 'password',
        //     first_name: 'Ahmed',
        //     last_name: 'Taha',
        //     phone_number: '1234557890',
        //     address: '123, Street, City',
        //     city: 'City',
        //     area: 'Area',
        // })
        // await newCustomer.save()

        const newOrder = new OrderModel({
            customer: '66a7e7f7f43bc127a2b6b080',
            products: [
                {
                    pid: '66a53ec7843ab0963cb6a3cc',
                    quantity: 2,
                    product_name: 'Testing Product 3',
                },
            ],
            total_price: 12000,
            delivery_address: {
                city: 'City',
                area: 'Area',
                address: '123, Street, City',
            },
        })

        await CustomerModel.findByIdAndUpdate('66a7e7f7f43bc127a2b6b080', {
            $push: { orders: newOrder._id },
        })

        await newOrder.save()

        res.status(201).json({ message: 'Customer added successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCurrUser(req, res) {
    try {
        const { id } = req.params
        const customer = await CustomerModel.findById(id)
            .populate({
                path: 'cart.product',
                model: 'Product',
            })
            .populate({
                path: 'wishlist',
                model: 'Product',
            })
            .populate({
                path: 'orders',
                model: 'Order',
            })
        const admin = await AdminModel.findById(id)

        if (!customer && !admin) {
            return res.status(404).json({ message: 'User not found' })
        }

        const user = customer || admin
        console.log(user)
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCustomer(req, res) {
    try {
        const { id } = req.params
        const customer = await CustomerModel.findById(id).populate({
            path: 'orders',
            model: 'Order',
        })

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        res.status(200).json({ customer })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getOrders(req, res) {
    try {
        const { id } = req.params
        const orders = await OrderModel.find({ customer: id }).populate({
            path: 'products',
            model: 'Product',
        })

        if (!orders) {
            return res.status(404).json({ message: 'Orders not found' })
        }

        res.status(200).json({ orders })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function addNewCategory(req, res) {
    try {
        console.log(req.body)
        const category = new CategoryModel({
            name: req.body.categoryName,
            name_ar: req.body.categoryNameAr,
            imageUrl: req.body.imageUrl,
            type: req.body.type,
        })
        await category.save()

        res.status(201).json({ category })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function addNewProduct(req, res) {
    try {
        console.log(req.body)
        const product = new ProductModel({
            pid: req.body.pid,
            name: req.body.name,
            name_ar: req.body.nameAr,
            description: req.body.description,
            description_ar: req.body.descriptionAr,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            imageUrl: req.body.imageUrl,
        })
        await product.save()

        res.status(201).json({ message: 'Product added successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCategory(req, res) {
    try {
        const { id } = req.params
        const category = await CategoryModel.findById(id)

        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }

        res.status(200).json({ category })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCategories(req, res) {
    try {
        const categories = await CategoryModel.find()

        if (!categories) {
            return res.status(404).json({ message: 'No categories found' })
        }

        res.status(200).json({ categories })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getProducts(req, res) {
    try {
        const products = await ProductModel.find()

        if (!products) {
            return res.status(404).json({ message: 'Products not found' })
        }

        res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getProduct(req, res) {
    try {
        const { id } = req.params
        const product = await ProductModel.findById(id).populate('category')

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCategoryProducts(req, res) {
    try {
        const { id } = req.params
        const products = await ProductModel.find({ category: id })

        if (!products) {
            return res.status(404).json({ message: 'Products not found' })
        }

        res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCarouselProducts(req, res) {
    try {
        const products = await ProductModel.find({ carousel: true })
        console.log('p', products)
        if (!products) {
            return res.status(404).json({ message: 'Products not found' })
        }
        res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateCategory(req, res) {
    try {
        const { id } = req.params
        const category = await CategoryModel.findById(id)

        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }

        const oldImageUrl = category.imageUrl
        const newImageUrl = req.body.imageUrl

        category.name = req.body.name
        category.name_ar = req.body.nameAr
        category.type = req.body.type
        if (newImageUrl) {
            category.imageUrl = newImageUrl
            if (oldImageUrl && oldImageUrl !== newImageUrl) {
                const baseDir = path.resolve(__dirname, '..')
                const fullPath = path.join(baseDir, oldImageUrl)

                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error('Error deleting image:', err)
                    } else {
                        console.log('Image deleted successfully:', fullPath)
                    }
                })
            }
        }
        await category.save()

        res.status(200).json({ category })
    } catch (error) {
        console.error('Error updating category:', error)
        res.status(500).json({ message: error.message })
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params
        const product = await ProductModel.findById(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const oldImageUrl = product.imageUrl
        const newImageUrl = req.body.imageUrl

        product.pid = req.body.pid
        product.name = req.body.name
        product.name_ar = req.body.nameAr
        product.description = req.body.description
        product.description_ar = req.body.descriptionAr
        product.category = req.body.category
        product.price = req.body.price
        product.stock = req.body.stock
        product.carousel = req.body.carousel
        if (newImageUrl) {
            product.imageUrl = newImageUrl
            if (oldImageUrl && oldImageUrl !== newImageUrl) {
                const baseDir = path.resolve(__dirname, '..')
                const fullPath = path.join(baseDir, oldImageUrl)

                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error('Error deleting image:', err)
                    } else {
                        console.log('Image deleted successfully:', fullPath)
                    }
                })
            }
        }
        await product.save()

        res.status(200).json({ product })
    } catch (error) {
        console.error('Error updating product:', error)
        res.status(500).json({ message: error.message })
    }
}

async function getCustomers(req, res) {
    try {
        const customers = await CustomerModel.find()

        if (!customers) {
            return res.status(404).json({ message: 'No customers found' })
        }

        res.status(200).json({ customers })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getAdmins(req, res) {
    try {
        const admins = await AdminModel.find({ type: 'Admin' })

        if (!admins) {
            return res.status(404).json({ message: 'No admins found' })
        }

        res.status(200).json({ admins })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getSuperAdmins(req, res) {
    try {
        const superAdmins = await AdminModel.find({ type: 'Super Admin' })

        if (!superAdmins) {
            return res.status(404).json({ message: 'No super admins found' })
        }

        res.status(200).json({ superAdmins })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteCustomer(req, res) {
    try {
        const { id } = req.params
        const customer = await CustomerModel.findByIdAndDelete(id).populate(
            'orders'
        )

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        const orders = customer.orders
        if (orders.length) {
            orders.forEach(async (order) => {
                await order.remove()
            })
        }

        res.status(200).json({ message: 'Customer deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteAdmin(req, res) {
    try {
        const { id } = req.params
        const admin = await AdminModel.findByIdAndDelete(id)

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }

        res.status(200).json({ message: 'Admin deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteSuperAdmin(req, res) {
    try {
        const { id } = req.params
        const superAdmin = await AdminModel.findByIdAndDelete(id)

        if (!superAdmin) {
            return res.status(404).json({ message: 'Super Admin not found' })
        }

        res.status(200).json({ message: 'Super Admin deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params
        const category = await CategoryModel.findByIdAndDelete(id)

        const baseDir = path.resolve(__dirname, '..')
        const fullPath = path.join(baseDir, category.imageUrl)

        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error('Error deleting image:', err)
            } else {
                console.log('Image deleted successfully:', fullPath)
            }
        })

        const products = await ProductModel.find({ category: id })

        if (products.length) {
            products.forEach(async (product) => {
                product.category = null
                await product.save()
            })
        }

        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }

        res.status(200).json({ message: 'Category deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params
        const product = await ProductModel.findByIdAndDelete(id)

        const baseDir = path.resolve(__dirname, '..')
        const fullPath = path.join(baseDir, product.imageUrl)

        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error('Error deleting image:', err)
            } else {
                console.log('Image deleted successfully:', fullPath)
            }
        })

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateCustomer(req, res) {
    try {
        const { id } = req.params
        const customer = await CustomerModel.findById(id).populate('orders')

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        customer.first_name = req.body.first_name
        customer.last_name = req.body.last_name
        customer.email_address = req.body.email_address
        customer.phone_number = req.body.phone_number
        customer.password = req.body.password
        customer.address = req.body.address
        customer.city = req.body.city
        customer.area = req.body.area
        customer.subscribed = req.body.subscribed
        customer.status = req.body.status || 'Active'

        await customer.save()

        res.status(200).json({ customer })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateProfile(req, res) {
    try {
        const { id } = req.params
        const customer = await CustomerModel.findById(id).populate('orders')

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        customer.first_name = req.body.first_name
        customer.last_name = req.body.last_name
        customer.email_address = req.body.email_address
        customer.phone_number = req.body.phone_number
        customer.address = req.body.address
        customer.city = req.body.city
        customer.area = req.body.area
        customer.subscribed = req.body.subscribed

        await customer.save()

        res.status(200).json({ customer })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updatePassword(req, res) {
    try {
        const { id } = req.params
        const customer = await CustomerModel.findById(id).populate('orders')

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        customer.password = req.body.password

        await customer.save()

        res.status(200).json({ customer })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateAdmin(req, res) {
    try {
        const { id } = req.params
        const admin = await AdminModel.findById(id)

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }

        admin.first_name = req.body.first_name
        admin.last_name = req.body.last_name
        admin.email_address = req.body.email_address
        admin.phone_number = req.body.phone_number
        admin.password = req.body.password
        admin.status = req.body.status

        await admin.save()

        res.status(200).json({ admin })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function promoteAdmin(req, res) {
    try {
        const { id } = req.params
        const admin = await AdminModel.findById(id)

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }

        admin.type = 'Super Admin'
        await admin.save()

        res.status(200).json({ admin })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function demoteAdmin(req, res) {
    try {
        const { id } = req.params
        const admin = await AdminModel.findById(id)

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }

        admin.type = 'Admin'
        await admin.save()

        res.status(200).json({ admin })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCategoryId(req, res) {
    try {
        const { name } = req.params
        const category = await CategoryModel.findOne({ name: name }).select(
            '_id'
        )

        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }

        res.status(200).json({ category })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function addToCart(req, res) {
    try {
        const { id } = req.params
        const { productId, quantity } = req.body
        const customer = await CustomerModel.findById(id).populate(
            'cart.product'
        )

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        const product = await ProductModel.findById(productId)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const cartProduct = customer.cart.find(
            (item) => item.product._id.toString() === productId
        )

        if (cartProduct) {
            cartProduct.quantity += quantity
        } else {
            customer.cart.push({ product: productId, quantity })
        }

        await customer.save()

        res.status(200).json({ customer })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function removeFromCart(req, res) {
    try {
        const { id } = req.params
        const { productId } = req.body
        const customer = await CustomerModel.findById(id).populate(
            'cart.product'
        )

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        const productIndex = customer.cart.findIndex(
            (item) => item.product._id.toString() === productId
        )

        if (productIndex >= 0) {
            customer.cart.splice(productIndex, 1)
        }

        await customer.save()

        res.status(200).json({ customer })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateProductQuantity(req, res) {
    try {
        const { id } = req.params
        const { productId, mode } = req.body
        const customer = await CustomerModel.findById(id).populate(
            'cart.product'
        )

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        if (mode === 'increase') {
            const cartProduct = customer.cart.find(
                (item) => item.product._id.toString() === productId
            )
            cartProduct.quantity += 1
        } else if (mode === 'decrease') {
            const cartProduct = customer.cart.find(
                (item) => item.product._id.toString() === productId
            )
            cartProduct.quantity -= 1

            if (cartProduct.quantity <= 0) {
                const productIndex = customer.cart.findIndex(
                    (item) => item.product._id.toString() === productId
                )
                customer.cart.splice(productIndex, 1)
            }
        }

        await customer.save()

        res.status(200).json({ customer })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function addToWishlist(req, res) {
    try {
        const { id } = req.params
        const { productId } = req.body

        const customer = await CustomerModel.findById(id).populate('wishlist')

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        const product = await ProductModel.findById(productId)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const wishlistProduct = customer.wishlist.find(
            (item) => item._id.toString() === productId
        )

        if (!wishlistProduct) {
            customer.wishlist.push(productId)
        }

        await customer.save()

        res.status(200).json({ customer })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function removeFromWishlist(req, res) {
    try {
        const { id } = req.params
        const { productId } = req.body

        const customer = await CustomerModel.findById(id).populate('wishlist')

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        const productIndex = customer.wishlist.findIndex(
            (item) => item._id.toString() === productId
        )

        if (productIndex >= 0) {
            customer.wishlist.splice(productIndex, 1)
        }

        await customer.save()

        res.status(200).json({ customer })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function createOrder(req, res) {
    try {
        const { id } = req.params

        const customer = await CustomerModel.findById(id).populate(
            'cart.product'
        )

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        const products = customer.cart.map((item) => {
            return {
                pid: item.product._id,
                product_name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
            }
        })

        const total_price = products.reduce((acc, item) => {
            return acc + item.price * item.quantity
        }, 0)

        const order = new OrderModel({
            customer: id,
            products,
            total_price,
            delivery_address: {
                city: customer.city,
                area: customer.area,
                address: customer.address,
            },
        })

        await order.save()
        customer.cart = []
        await customer.save()

        products.forEach(async (item) => {
            const product = await ProductModel.findById(item.pid)
            product.stock -= item.quantity
            await product.save()
        })

        res.status(201).json({ order })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCart(req, res) {
    try {
        const { id } = req.params
        const customer = await CustomerModel.findById(id).populate(
            'cart.product'
        )

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        res.status(200).json({ cart: customer.cart })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getWishlist(req, res) {
    try {
        const { id } = req.params
        const customer = await CustomerModel.findById(id).populate('wishlist')

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        res.status(200).json({ wishlist: customer.wishlist })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function emptyCart(req, res) {
    try {
        const { id } = req.params
        const customer = await CustomerModel.findById(id).populate(
            'cart.product'
        )

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        customer.cart = []

        await customer.save()

        res.status(200).json({ message: 'Cart emptied successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export {
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
}
