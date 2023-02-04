const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((data)=>{
    console.log(`Mondodb connected with server: ${data.Connection.name}`)
})
.catch((err)=>{
    console.log(err);
})
}

module.exports = connectDatabase;