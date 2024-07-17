import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        product: {
            
            id:Number,
            image:String,
            title:String,
            price:Number,
            description:String,
            rating:String
        
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
    },
    { timestamps: true }
);


// Pre-save hook to calculate totalPrice
cartItemSchema.pre('save', function (next) {
    this.totalPrice = this.product.price * this.quantity;
    next();
});

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [cartItemSchema],
        totalAmount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

// Pre-save hook for calculating totalAmount
cartSchema.pre('save', function (next) {
    this.totalAmount = this.items.reduce((acc, item) => acc + item.totalPrice, 0);
    next();
});


const Cart = mongoose.model("Cart", cartSchema);

export { Cart };
