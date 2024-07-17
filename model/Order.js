import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
      
        quantity: {
            type: Number,
            default: 1,
            min: 1
        },
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
    }, 
    { timestamps: true }
);

const Orders = mongoose.model("Orders", orderSchema);

export { Orders };
