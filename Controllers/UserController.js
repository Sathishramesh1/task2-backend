import * as bcrypt from 'bcrypt'
import {User} from '../model/User.js'
import jwt from 'jsonwebtoken'



//user login
const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        let user= await User.findOne({email:email});

if (!user) {
    return res.status(401).json({ message: "Email is not Registered" });
      }

const passwordMatch = await bcrypt.compare(password, user.password);

if (!passwordMatch) {
         return res.status(401).json({ message: "Wrong Password" });
      }
           
const jwttoken = jwt.sign({id:user._id}, process.env.SECRET_KEY,{ expiresIn: '1h' });

res.cookie('x-auth-token', jwttoken, {
    httpOnly: true, 
    secure:true, 
    sameSite: 'None', 
    maxAge: 3600000 
});
        
          res.status(200).json({message:"login success" });    
    } 
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error")
        
    }

}

export {Login}


//register  logic for user
const Register=async(req,res)=>{
 
    try{
        // Check if this user already exists
    let user = await User.findOne({ email: req.body.email });
    // console.log(user)
    if (user) {
      return res.status(400).send('That user already exists!');}

    const {password}=req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser= await new User({ ...req.body, password: hashedPassword }).save();
    
   return  res.status(201).json({
        status:'success',
        message:"new user created"
    })
    }catch(err){
        console.log("error in creating new user",err);
       return res.status(500).send("Internal Error");
    }

}

export {Register}