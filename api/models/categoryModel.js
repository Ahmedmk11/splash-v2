import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
        },
        image: {
            type: String,
            required: [true, 'Product image is required'],
        },
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

const CategoryModel = mongoose.model('Category', categorySchema)

export default CategoryModel
