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
        name_ar: {
            type: String,
            required: [true, 'Product name is required'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
        },
        description_ar: {
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
        imageUrls: {
            type: [String],
            required: [true, 'Product image is required'],
        },
        carousel: {
            type: Boolean,
            required: [true, 'Product carousel images are required'],
            default: false,
        },
    },
    { autoIndex: false },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

productSchema.index({
    name: 'text',
    name_ar: 'text',
    description: 'text',
    description_ar: 'text',
})

const ProductModel = mongoose.model('Product', productSchema)

export default ProductModel
