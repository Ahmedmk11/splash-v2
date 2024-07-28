import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

import CustomerModel from '../models/customerModel.js'
import AdminModel from '../models/adminModel.js'
import CategoryModel from '../models/categoryModel.js'
import ProductModel from '../models/productModel.js'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const __dirname = dirname(currentFilePath)
dotenv.config({ path: path.join(__dirname, '.env') })

// --------------------------------------------------
// API Endpoints
// --------------------------------------------------

async function getCurrUser(req, res) {
    try {
        const { id } = req.params
        const customer = await CustomerModel.findById(id)
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

async function addNewCategory(req, res) {
    try {
        console.log(req.body)
        const category = new CategoryModel({
            name: req.body.categoryName,
            imageUrl: req.body.imageUrl,
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
            description: req.body.description,
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
        const products = ProductModel.find({ category: id })

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
        product.description = req.body.description
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

export {
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
}
