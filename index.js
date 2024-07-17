import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {dbconnection} from './database/dbconnection.js'
import cookieParser from 'cookie-parser';
import { UserRouter } from './Routers/UserRouter.js'
import { ProductRouter } from './Routers/ProductRouter.js'
import { CartRouter } from './Routers/CartRouter.js'
import { isAuthorized } from './middleware/isAuthozied.js'
import { OrderRouter } from './Routers/OrderRouter.js';




//configuration .env files
dotenv.config();



const corsOptions = {
    origin: 'https://ecart-shopping.netlify.app', 
    credentials: true, 
};


//assign app to express server
const app=express();
app.use(cors(corsOptions));

app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser()); 



//database connection
dbconnection();

const PORT=process.env.PORT;


//ROUTES
app.use("/api/user/v1",UserRouter);
app.use("/api/products/v1",ProductRouter);
app.use("/api/products/v1",isAuthorized,CartRouter);
app.use("/api/order/v1" ,isAuthorized,OrderRouter)





app.get("/",(req,res)=>{
    return res.status(200).send("server working");
})



app.listen(PORT,()=>{
    console.log("server running on ",PORT);  
})