import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema(
    {
        logoUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

const SettingsModel = mongoose.model('Settings', settingsSchema)

export default SettingsModel
