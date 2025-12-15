//console.log("This is my first Backend Project!")
const express = require("express");
const {connectDB}=require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
require('./utils/cronJob')
const http = require("http");


app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

const authRoute = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");
const connectionRoute = require("./routes/connectionRoute");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payments");
const { initializeSocket } = require("./utils/webSocket");

app.use('/', authRoute);
app.use('/', profileRoute);
app.use('/', connectionRoute);
app.use('/', userRouter);
app.use('/', paymentRouter);


const server = http.createServer(app);

initializeSocket(server);

connectDB().then(()=>{
    console.log("Database connection is established......");
    server.listen(process.env.RUNNING_PORT, ()=>{
    console.log("This is my Backend server running on port 3000....")
});
}).catch((err)=>{
    console.error("Connection can not be established!!!")
});

