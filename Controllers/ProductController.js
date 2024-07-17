import { Products } from '../model/Products.js';

const AddProduct = async (req, res) => {
    try {
        const {
            productName,
            price,
            subcategory,
            productImage,
            category,
            description,
            tagline,
            quantity
        } = req.body;

       
        const newProduct = new Products({
            productName,
            price,
            subcategory,
            productImage,
            category,
            description,
            tagline,
            quantity
        });

       
        await newProduct.save();

        
        return res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error in creating new product:", error);
        return res.status(500).send("Internal Server Error");
    }
};

export { AddProduct };
