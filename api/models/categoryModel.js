import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Category name is required'],
        },
        imageUrl: {
            type: String,
            unique: true,
            required: [true, 'Category image is required'],
        },
        type: {
            type: String,
            enum: ['inquiry', 'main', 'display'],
            default: 'main',
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
