//console.log("This is my first Backend Project!")
const express = require("express");

const {connectDB}=require("./config/database");
const app = express();

const User = require("./models/users");

app.post("/signup", async(req,res)=>{
    const user = new User({
        firstName : "Vickey",
        lastName : "Sharma",
        emailId: "Vivek@gmail.com",
        password: "Vivek#123"
    });
    try{
         await user.save();
         res.status(201).send("User added successfull......");
    }catch(err){
         res.status(400).send("Error while saving the user: ", err.messsage)
    }
    
})
connectDB().then(()=>{
    console.log("Database connection is established......");
    app.listen(3000, ()=>{
    console.log("This is my Backend server running on port 3000....")
});
}).catch((err)=>{
    console.error("Connection can not be established!!!")
});

