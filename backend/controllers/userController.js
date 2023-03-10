const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../Models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");

//Register a user
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is sample",
            url:"profile_url"
        }
    })

    sendToken(user,200,res);
})


exports.loginUser = catchAsyncErrors( async(req,res,next)=>{
    const {email,password} = req.body;
    if (!email || !password){
        return next(new ErrorHandler("Please provide email and password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if (!user){
        return next(new ErrorHandler("Invalid credentials",401));
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return next(new ErrorHandler("Invalid credentials",401));
    }

 sendToken(user,200,res);
});



exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token",null ,{
        expires: new Date(Date.now()),
        httpOnly: true,

    })

    res.status(200).json({
        sucess:true,
        message:"Logged Out"
    })
})

//Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email:req.body.email});

    if (!user){
        return next(new ErrorHandler("User not found",404));
    }

    //Get Reset Password token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetPasswordUrl}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password reset token",
            message
        });

        res.status(200).json({success: true, message:"Email has been reset successfully"})
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false})
        return next(new ErrorHandler(error.message,500));
    }
})