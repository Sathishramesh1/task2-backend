import Stripe from 'stripe';
import express from 'express';
import {Cart} from '../model/Cart.js'
import { getOrder, placeOrder } from '../Controllers/OrderController.js';
import dotenv from 'dotenv'


dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

const YOUR_DOMAIN = 'https://ecart-shopping.netlify.app';



const router=express.Router();



router.route('/placeorder').post(placeOrder);



router.route('/create-checkout-session').post(async (req, res) => {

    const { amount } = req.body;

    
    const amountInCents = Math.round(amount);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
customer_email: req.user.email,
    submit_type: 'donate',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
       
      line_items: [
        {
            price_data: {
              currency: 'usd', 
              product_data: {
                name: "sample_data", 
              },
              unit_amount: amountInCents, 
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
  


router.route('/order-history').get(getOrder);



export {router as OrderRouter}