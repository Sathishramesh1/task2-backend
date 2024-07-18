import { Cart } from '../model/Cart.js';
import { Orders } from '../model/Order.js'; 



const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id; 
        const cart = await Cart.findOne({ user: userId }).populate('items');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty or not found" });
        }

        // Create array of items for the order
        const items = cart.items.map(item => ({
            product: {
                id: item.product.id,
                image: item.product.image,
                title: item.product.title,
                price: item.product.price,
                description: item.product.description,
                rating: item.product.rating
            },
            quantity: item.quantity,
            totalPrice: item.quantity * item.product.price 
        }));

        // Create a new order document
        const newOrder = new Orders({
            user: userId,
            items,
            totalAmount: cart.totalAmount 
        });

        // Save the new order to db
        await newOrder.save();

        // Clear the cart after placing order
        await Cart.findOneAndDelete({ user: userId });

        return res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { placeOrder };


const getOrder=async()=>{
    try {

        const userId = req.user._id; 
        const order=await Orders.find({user:userId});


        if (!order) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(order);
        
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

export {getOrder}