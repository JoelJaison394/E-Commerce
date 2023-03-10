const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModels");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuth = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    // console.log(token);
    if(!token){
        return next(new ErrorHandler("Please login to access this resource.",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);
    // console.log(decodedData);
    next();
});
 
exports.authorizeRoles=(...roles) => {
    return (req,res,next)=>{
        // console.log(req.user)
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler("You are not authorized to access this resource.",403));
        }
        next();
    }
}