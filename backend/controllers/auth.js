import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import crypto from "crypto"
import {promisify} from "util"
import {sendEmail} from '../utils/EmailSenderProd.js'
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
const CreateAndSendEmailVerification = async (user,req,res) => {
    // GENERATE RANDOM VERIFY TOKEN
    const verifyToken = user.createVerifyToken();
    await user.save({ validateBeforeSave: false });
    // SEND TOKEN TO USER
    // const verifyUrl = `${req.protocol}://${req.get('host')}/api/users/verify/${verifyToken}`;
    const verifyUrl = `http://localhost:3000/verify/${verifyToken}`;
    const message = `Verify Your Account go to this link to verify your account ${verifyUrl}`;
    try {
        await sendEmail({
            email:user.email,
            subject:"Verify Your Account",
            message
        })
        return res.status(200).json(success("Verify Token sent to Email"))
    } catch (error) {
        user.verifyToken = undefined
        user.verifyTokenExpires = undefined
        await user.save({ validateBeforeSave: false });
        return res.status(500).json(fail("Error sending verification token"))
    }
}
const createAndSendPasswordReset = async (user,req,res)=>{
    try {
        //GENERATE RESET TOKEN
        console.log("test");

        const resetToken = user.createPasswordResetToken();
        // SAVE USER
        console.log("test passed",resetToken);

        await user.save({validateBeforeSave:false});
        const resetURL = `http://localhost:3000/resetPassword/${resetToken}`;
        const message = `Reset Your Password go to this link to verify your account ${resetURL}`;
        console.log(message);
        await sendEmail({
            email:user.email,
            subject:"Reset Your password",
            message
        })
        res.status(200).json(success("Reset Token sent to Email"))


    } catch (error) {
        user.createPasswordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave:false})
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
           return  CreateAndSendEmailVerification(newUser,req,res);

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

export const login = async(req, res, next) => {
    // GET EMAIL AND PASSWORD FROM REQUEST
    const {email,password} = req.body;
    try {
        // CHECK EMAIL AND PASSWORD EXISTS
        if(!email || !password) {
            throw new Error("Please provide email and password")
        }
        // FIND USER BY EMAIL
        const user = await User.findOne({email}).select('+password')
        if(!user) throw new Error("No such user")
        // CHECK IF ACCOUNT IS VERIFIED
        if(!user.verified){
            return CreateAndSendEmailVerification(user,req,res);
        }

        if(!user || ! (await user.correctPassword(password,user.password))) {
            throw new Error("Invalid email or password")

        }
        // CREATE AND SEND NEW JWT TOKEN
        createSendToken(user,200,res);

    } catch (error) {
        res.status(400).json(fail(error.message));
    }
}

export const logout = async(req, res, next) => {
    res.cookie('jwt', 'xxxx', {
        expires: new Date(Date.now()),
        httpOnly: true
      });      
      res.status(200).json(success("Logout successfully"));  
}

export const protect = async (req, res,next) => {
    try {
        let token;
        // CHECK IF TOKEN IS IN REQUEST
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        } 
        else if(req.cookies.jwt){
            token = req.cookies.jwt;
        }
        // Check if token is Not found
        if(!token)
        {
            throw new Error("You ARE NOT LOGGED IN  PLEASE LOGIN AND TRY AGAIN");
        }
        // VERIFY JWT TOKEN;
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

        // SEARCH FOR USER
        const currentUser = await User.findById(decoded.id);
        // IF NO USER FOUND THROW ERROR
        if(!currentUser)
        {
            throw new Error("No such user");
        }
        /**
         *  IF user hasn't Verifies his email yet, send him an email to verify
         */
        if(!currentUser.verified)
        {
            return CreateAndSendEmailVerification(currentUser,req,res)
        }
        /**
         * IF USER CHANGED PASSWORD AFTER ISSUING JWT TOKEN
         * ASK HIM TO SING IN AGAIN
         * 
         */
         if (currentUser.changedPasswordAfter(decoded.iat)) {
            throw new Error("Please Login again to continue")
          }
        // ADD USER TO REQUEST
         req.user = currentUser;
         // IF NO ERROR UP TILL NOW THEN PASSED AND GO TO NEXT MIDDLEWARE
         next();        
        
    } catch (error) {
        res.status(400).json(fail(error.message))
    }

}

export const forgotPassword = async (req, res, next) =>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) throw new Error("There is no user with email " + req.body.email);
        return createAndSendPasswordReset(user,req,res);

    } catch (error) {
        return res.status(500).json(fail(error.message))        
    }
};
export const resetPassword = async (req, res, next) =>{
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        // FIND USER BY TOKEN
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires:{$gt:Date.now()}
        });
         // IF NO USER THROW ERROR
         if(!user) throw new Error("TOken is invalid or expired")
         // CHANGE PASSWORD 
         user.password = req.body.password;
         //  REMOVE RESET TOKKEN FROM DATABASE
         user.passwordResetToken = undefined;
         user.passwordResetExpires = undefined;
         await user.save();
         // SEND NEW JWT TOKEN
         createSendToken(user,201,res)

    } catch (error) {
        console.log("Error",error);
        res.status(500).json({
            status:"Failed",
            message:error.message
        })
    }
}




