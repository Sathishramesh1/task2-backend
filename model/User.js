import mongoose from "mongoose";
import validator from "validator";



const UserSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Please enter a valid email address"
        }
    },
    password:{
        type:String,
        required:true,
        minlength: [6, "Password must be at least 6 characters long"],
    },
   resetToken: {
        type: String,
        default: null
    }
});

const User=mongoose.model("User",UserSchema);

export {User}