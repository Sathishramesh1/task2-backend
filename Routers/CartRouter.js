import express from 'express'
import {AddToCart, GetCart, RemoveFromCart} from '../Controllers/CartController.js'




const router=express.Router();


//route for adding to cart
router.route('/addtocart').post(AddToCart);

//route for get all from cart
router.route('/getcart').get(GetCart)


//route for delete the product from cart
router.route('/remove').delete(RemoveFromCart)



export {router as CartRouter}