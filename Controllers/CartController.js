import {Cart}  from '../model/Cart.js'





//function for adding product to the customer cart
const AddToCart=async(req,res)=>{

   try {

    const {  product, quantity } = req.body;

   

    // Find user cart or create
    let cart = await Cart.findOne({ user:req.user._id });
    if (!cart) {
        cart = new Cart({
            user: req.user._id,
            items: [],
            totalAmount: 0
        });
    }

    // Check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex(item => item.product.id === product.id);



    if (existingItemIndex >= 0) {
        // Update the quantity and total price
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].totalPrice = cart.items[existingItemIndex].product.price * cart.items[existingItemIndex].quantity;
    } else {
        // Add the new item to the cart
        cart.items.push({
            product: {
                id: product.id,
                image: product.image,
                title: product.title,
                price: product.price,
                description:product.description,
                rating:product.rating
            },
            quantity,
            totalPrice: product.price * quantity
        });
    }

    
      // Calculate total amount for the cart
      cart.totalAmount = cart.items.reduce((total, item) => total + item.totalPrice, 0);

      // Save the cart
      await cart.save();
      return res.status(200).json({ message: "Product added to cart successfully", cart });

   } catch (error) {
    console.error("Error in creating new product:", error);
    return res.status(500).send("Internal Server Error");

   }



}


export {AddToCart}






//get the cart details from user
const GetCart=async(req,res)=>{
    try {
        
        const userId=req.user._id;
        

        //  cart from the database
        const cart = await Cart.findOne({ user: userId }).populate('items');

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        return res.status(200).json(cart); 

    } catch (error) {
    console.error("Error in creating new product:", error);
    
    return res.status(500).send("Internal Server Error");
        
    }
}


export {GetCart}


// Remove an item from the cart
const RemoveFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const itemId = Number(req.query.itemId); 

        if (isNaN(itemId)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }

        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the item from the cart's items array
        const initialItemCount = cart.items.length;
        cart.items = cart.items.filter(item => item.product.id !== itemId);

        if (cart.items.length === initialItemCount) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Recalculate totalAmount if needed
        await cart.save();

        return res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        return res.status(500).send("Internal Server Error");
    }
};

export { RemoveFromCart };
