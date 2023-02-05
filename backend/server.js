const app = require("./app")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")




//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1)
})


dotenv.config({path:"backend/config/config.env"})

//connection to the database
connectDatabase();



const server = app.listen(9000,()=>{
    console.log(`server is running on http://localhost${process.env.PORT}`)
})


// Unhandled Promise Rejection 
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });

});