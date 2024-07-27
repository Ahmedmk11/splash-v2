import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        pid: {
            type: String,
            required: [true, 'Product ID is required'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'Product name is required'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Product category is required'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
        },
        stock: {
            type: Number,
            required: [true, 'Product stock is required'],
        },
        image: {
            type: String,
            required: [true, 'Product image is required'],
        },
        carousel: {
            type: Boolean,
            required: [true, 'Product carousel images are required'],
            default: false,
        },
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

const ProductModel = mongoose.model('Product', productSchema)

export default ProductModel
