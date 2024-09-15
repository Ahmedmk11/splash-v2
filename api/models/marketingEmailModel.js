import mongoose from 'mongoose'

const marketingEmailSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
        },
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

const MarketingEmailModel = mongoose.model(
    'MarketingEmail',
    marketingEmailSchema
)

export default MarketingEmailModel
