import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Category name is required'],
        },
        name_ar: {
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
            required: [true, 'Category type is required'],
        },
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

categorySchema.index({
    name: 'text',
    name_ar: 'text',
})

const CategoryModel = mongoose.model('Category', categorySchema)

export default CategoryModel
