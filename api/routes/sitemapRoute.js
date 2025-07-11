import express from 'express'
import CategoryModel from '../models/categoryModel.js'
import ProductModel from '../models/productModel.js'

const router = express.Router()

router.get('/sitemap.xml', async (req, res) => {
    const baseUrl = 'https://www.splash-furniture.com'

    const today = new Date().toISOString()
    const products = await ProductModel.find({}, '_id updatedAt')
    const categories = await CategoryModel.find({}, '_id updatedAt')

    const staticRoutes = [
        '/',
        '/about',
        '/contact',
        '/forgot-password',
        '/account',
        '/cart',
        '/wishlist',
        '/login',
        '/sign-up',
    ]

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

    staticRoutes.forEach((path) => {
        let priority = '0.5'

        if (path === '/') {
            priority = '1.0'
        } else if (['/about', '/contact'].includes(path)) {
            priority = '0.8'
        } else if (['/account', '/cart', '/wishlist'].includes(path)) {
            priority = '0.7'
        } else if (['/forgot-password'].includes(path)) {
            priority = '0.6'
        } else if (['/login', '/sign-up'].includes(path)) {
            priority = '0.4'
        }

        xml += `
    <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
    </url>`
    })

    categories.forEach((cat) => {
        xml += `
    <url>
        <loc>${baseUrl}/category/${cat._id}</loc>
        <lastmod>${cat.updatedAt.toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>`
    })

    products.forEach((prod) => {
        const lastmod = prod.updatedAt ? prod.updatedAt.toISOString() : today
        xml += `
    <url>
        <loc>${baseUrl}/product/${prod._id}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>`
    })

    xml += `\n</urlset>`

    res.header('Content-Type', 'application/xml')
    res.send(xml)
})

export default router
