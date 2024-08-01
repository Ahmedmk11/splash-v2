import mongoose from 'mongoose'
import moment from 'moment-timezone'

const setEgyptianTimezone = function (next) {
    const egyptTime = moment.tz(Date.now(), 'Africa/Cairo').valueOf()
    this.createdAt = egyptTime
    next()
}

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: [true, 'Customer is required'],
        },
        products: [
            {
                pid: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                product_name: {
                    type: String,
                    required: [true, 'Product name is required'],
                },
                price: {
                    type: Number,
                    required: [true, 'Product price is required'],
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
            type: {
                city: {
                    type: String,
                    required: [true, 'City is required'],
                },
                area: {
                    type: String,
                    required: [true, 'Area is required'],
                },
                address: {
                    type: String,
                    required: [true, 'Address is required'],
                },
            },
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
        date: {
            type: Number,
            default: Date.now,
        },
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

orderSchema.pre('save', setEgyptianTimezone)

const OrderModel = mongoose.model('Order', orderSchema)

export default OrderModel
