import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const customerSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        email_address: {
            type: String,
            unique: true,
        },
        phone_number: {
            type: String,
        },
        password: {
            type: String,
        },
        city: {
            type: String,
        },
        area: {
            type: String,
        },
        address: {
            type: String,
        },
        email_verified: {
            type: Boolean,
            default: false,
        },
        subscribed: {
            type: Boolean,
            default: false,
        },
        cart: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            },
        ],
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Active',
        },
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

customerSchema.pre('save', async function () {
    if (!this.isModified('password')) return

    this.password = await bcrypt.hash(this.password, 12)
})

customerSchema.methods.comparePassword = async function (
    enteredPassword,
    hashedPassword
) {
    return await bcrypt.compare(enteredPassword, hashedPassword)
}

const CustomerModel = mongoose.model('Customer', customerSchema)

export default CustomerModel
