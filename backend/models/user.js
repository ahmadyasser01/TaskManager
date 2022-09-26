import mongoose from 'mongoose';
import validator from "validator";
import bcrypt from 'bcryptjs';
import crypto from "crypto"


const userSchema = new mongoose.Schema({
    username:{ 
        type:String,
        required:[true,"user Name is required"],
        trim:true,
        minLength:2,
        unique: true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        lowercase:true,
        unique:true,
        trim:true,
        validate:[validator.isEmail,"Email is not valid"]
    },
    password:{
        type:String,
        trim:true,
        // validate:{
        //     validator:function(val){
        //         return validator.isStrongPassword(val)
        //     },
        //     message:"Password is not strong enough"
        
        // }
    },
    verified:{
        type:"boolean",
        default:false,
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
},{
    timestamps:true,
});

const User = mongoose.model('User',userSchema);
export default User;