import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: [true, 'Customer is required'],
        },
        products: [
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
        total_price: {
            type: Number,
            required: [true, 'Total price is required'],
        },
        delivery_address: {
            type: String,
            required: [true, 'Delivery address is required'],
        },
        status: {
            type: String,
            enum: [
                'Pending Confirmation',
                'Processing',
                'Shipped',
                'Delivered',
            ],
            default: 'Pending Confirmation',
        },
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

const OrderModel = mongoose.model('Order', orderSchema)

export default OrderModel
