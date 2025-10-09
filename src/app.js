//console.log("This is my first Backend Project!")
const express = require("express");

const app = express();

app.use("/hello",(req,res)=>{
    res.send("Hello now i am using nodemon and it awsome!");
});

app.use("/test",(req,res)=>{
     res.send("Hi I am from server how are you");
});

app.listen(3000, ()=>{
    console.log("This is my Backend server running on port 3000....")
});