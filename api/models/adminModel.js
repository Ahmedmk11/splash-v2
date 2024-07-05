import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        phone_number: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        type: {
            type: String,
            enum: ['Admin', 'Super Admin'],
            default: 'Admin',
        },
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

adminSchema.pre('save', async function () {
    if (!this.isModified('password')) return

    this.password = await bcrypt.hash(this.password, 12)
})

adminSchema.methods.comparePassword = async function (
    enteredPassword,
    hashedPassword
) {
    return await bcrypt.compare(enteredPassword, hashedPassword)
}

const AdminModel = mongoose.model('Admin', adminSchema)

export default AdminModel
