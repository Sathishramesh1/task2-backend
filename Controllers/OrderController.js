import { Cart } from '../model/Cart.js';
import { Orders } from '../model/Order.js'; 




//function place order
const placeOrder = async (req, res) => {
    try {

        //getting _id from middleware
        const userId = req.user._id; 
        const cart = await Cart.findOne({ user: userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty or not found" });
        }

        // creating new order
        const newOrder = new Orders({
            user: userId,
            items: cart.items,
            totalAmount: cart.totalAmount,
            
        });

        await newOrder.save(); 

        //clearing the cart
        await Cart.findOneAndDelete({ user: userId });

        return res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { placeOrder };
