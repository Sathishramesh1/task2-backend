import express from 'express'
import {Register} from '../Controllers/UserController.js'
import {Login} from '../Controllers/UserController.js'



const router=express.Router();


//route for login
router.route('/register').post(Register);

//route for login
router.route('/login').post(Login);






export {router as UserRouter}