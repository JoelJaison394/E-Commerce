const app = require("./app")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")


dotenv.config({path:"backend/config/config.env"})

//connection to the database
connectDatabase();



app.listen(9000,()=>{
    console.log(`server is running on http://localhost${process.env.PORT}`)
})