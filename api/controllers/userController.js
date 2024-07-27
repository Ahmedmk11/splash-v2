import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'

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
        res.status(500).json({ message: 'Internal server error' })
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
        res.status(500).json({ message: 'Internal server error' })
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
        res.status(500).json({ message: 'Internal server error' })
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
        res.status(500).json({ message: 'Internal server error' })
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
        res.status(500).json({ message: 'Internal server error' })
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
        res.status(500).json({ message: 'Internal server error' })
    }
}

export {
    getCurrUser,
    addNewCategory,
    addNewProduct,
    getCategory,
    getCategories,
    getCategoryProducts,
    getCarouselProducts,
}
