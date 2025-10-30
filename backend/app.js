const express = require("express");
const colors = require("colors")
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS
const database = require("../backend/config/database")
const multer = require("multer")
const path = require('path');
const apiDoc = require("./modules/v1/Api_document/route")

dotenv.config();
const app = express()
app.use(express.json())
app.use(cors());
app.use("/api-doc",apiDoc)

// app.use(require('./middleware/validators').extractHeaderLanguage);
// app.use(require('./middleware/validators').validateApiKey);
// app.use(require('./middleware/validators').validateHeaderToken);

let app_routing = require("./modules/app_routing")
app_routing.v1(app)

app.use("/uploads",express.static(path.join(__dirname,'uploads')));
try{
    app.listen(process.env.PORT || 3300,()=>{
        console.log(`App Started on ${process.env.PORT} PORT`.bgGreen)
    })
}catch(error){
    console.log(`Error in Server :${error}`.bgRed.white)
}