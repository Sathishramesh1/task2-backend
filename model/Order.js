import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        id: { type: Number, required: true },
        image: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        rating: { type: String, required: true }
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentInfo: {
        type: String,
        trim: true
    },
    shippingAddress: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Orders = mongoose.model("Orders", orderSchema);

export { Orders };
