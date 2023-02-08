const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        MinLenght:[3,"Name should have more than 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email address"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your password"],
        MinLenght:[8,"Password should be more  than 8 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type: String,
        default: "user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

module.exports = mongoose.model("Users",userSchema)