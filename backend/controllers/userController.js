const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../Models/userModels");

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
    });

    res.status(100).json({
        success:true,
        user
    })
})