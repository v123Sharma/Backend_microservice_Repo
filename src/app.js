//console.log("This is my first Backend Project!")
const express = require("express");
const {connectDB}=require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

const authRoute = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");
const connectionRoute = require("./routes/connectionRoute");

app.use('/', authRoute);
app.use('/', profileRoute);
app.use('/', connectionRoute);




connectDB().then(()=>{
    console.log("Database connection is established......");
    app.listen(3000, ()=>{
    console.log("This is my Backend server running on port 3000....")
});
}).catch((err)=>{
    console.error("Connection can not be established!!!")
});

