import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import crypto from "crypto"
import {promisify} from "util"
import {sendEmail} from '../utils/EmailSenderDev.js'
import { fail, success } from '../utils/apiUtils.js'


const signToken = (id)=>{
    /**
     * Create jwt token
     */
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })

}

const createSendToken = (user,statusCode,res)=>{
    /**
     * create token
     * create cookie 
     * send  response to user 
     */
    const token = signToken(user._id);
    const cookieOptions = {
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly:true
    };
    res.cookie('jwt',token,cookieOptions);
    user.password = undefined;

    res.status(statusCode).json({
        ...success(user),
        token
    })
}
const CreateAndSendEmailVerification = async (user,res) => {
    // GENERATE RANDOM VERIFY TOKEN
    const verifyToken = user.createVerifyToken();
    await user.save({ validateBeforeSave: false });
    // SEND TOKEN TO USER
    const verifyUrl = `${req.protocol}://${req.get('host')}/api/v1/users/verify/${verifyToken}`;
    const message = `Verify Your Account go to this link to verify your account ${verifyUrl}`;
    try {
        await sendEmail({
            email:user.email,
            subject:"Verify Your Account",
            message
        })
        res.status(200).json(success("Token sent to Email"))
    } catch (error) {
        user.verifyToken = undefined
        user.verifyTokenExpires = undefined
        await user.save({ validateBeforeSave: false });
        return res.status(500).json(fail("Error sending verification token"))
    }
}

export const signup = async(req,res,next) => {
    try {
        const {username,email,password} = req.body;
        const newUser = await User.create({
            username,
            email,
            password
        })
        if(!newUser) throw new Error('Couldn\'t create user');
            CreateAndSendEmailVerification(newUser,res);
         res.status(200).json({
            email,
            subject:"email verification",
            message:""

         })
    } catch (error) {
        res.status(500).json(fail(error.message));
    }
}
export const verifyEmail = async (req,res) =>{
    try {
        const {token} = req.params
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            verifyToken: hashedToken,
            verifyTokenExpires:{$gt:Date.now()}
        })
         // IF NO USER THROW ERROR
         if(!user) throw new Error("Token is invalid or expired");
         user.verified = true;
         user.verifyToken = undefined;
         user.verifyTokenExpires = undefined;
         await user.save();
        // SEND NEW JWT TOKEN
        createSendToken(user,201,res)
    } catch (error) {
        res.status(500).json(fail(error.message))
    }
}


