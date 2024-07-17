import Stripe from 'stripe';
import express from 'express';
import {Cart} from '../model/Cart.js'
import { placeOrder } from '../Controllers/OrderController.js';
import dotenv from 'dotenv'


dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

const YOUR_DOMAIN = 'http://localhost:5173';



const router=express.Router();



router.route('/placeorder').post(placeOrder);



router.route('/create-checkout-session').post(async (req, res) => {

    const { amount } = req.body;

    
    

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
      line_items: [
        {
            price_data: {
              currency: 'usd', 
              product_data: {
                name: "sample_data", 
              },
              unit_amount: amount, 
            },
            quantity:  1, 
          },
      ],
      mode: 'payment',
      ui_mode: 'embedded',
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
   
    
    res.json({ clientSecret: session.client_secret });
  }) 



  router.route('/session-status').get( async (req, res) => {
  
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
  
      res.json({
        status: session.status,
        customer_email: session.customer_details.email,
      });
    } catch (error) {
      console.error('Error retrieving session:', error);
      res.status(500).json({ error: 'Failed to retrieve session status' });
    }
  }
)
  




export {router as OrderRouter}