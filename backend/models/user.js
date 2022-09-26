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
    verifyToken:String,
    verifyTokenExpires:Date
},{
    timestamps:true,
});

userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);
    next();
});

// save The time when password is changed
userSchema.pre('save',async function(next){
    if(!this.isModified('password') ||  this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// CREATE PASSWORD RESET TOKEN
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

// CREATE PASSWORD RESET TOKEN
userSchema.methods.createVerifyToken = function(){
    const verifyToken = crypto.randomBytes(32).toString('hex');

    this.verifyToken = crypto.createHash('sha256').update(verifyToken).digest('hex');

    this.verifyTokenExpires = Date.now() + 10 * 60 * 1000;
    return verifyToken;
}

//  CHECK PASSWORD CORRECTNESS
userSchema.methods.correctPassword = async function(candidatePassword,userPassword)
{
    return await bcrypt.compare(candidatePassword,userPassword)
}
userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000,
        10);
        return JWTTimeStamp < changedTimeStamp;
    }
    return false;
}







const User = mongoose.model('User',userSchema);
export default User;