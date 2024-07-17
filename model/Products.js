import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            mrp: {
                type: Number,
                required: true,
                min: 0
            },
            cost: {
                type: Number,
                required: true,
                min: 0
            },
            discountPercent: {
                type: Number,
                min: 0,
                max: 100
            }
        },
        subcategory: {
            type: String,
            trim: true
        },
        productImage: {
            type: String,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        tagline: {
            type: String,
            trim: true
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }, 
    { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

export { Products };
