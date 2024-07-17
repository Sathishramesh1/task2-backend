import express from 'express'
import { AddProduct } from '../Controllers/ProductController.js';




const router=express.Router();


//route for adding product
router.route('/addproduct').post(AddProduct);








export {router as ProductRouter}