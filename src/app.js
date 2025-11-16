//console.log("This is my first Backend Project!")
const express = require("express");
const {connectDB}=require("./config/database");
const app = express();
const User = require("./models/users");
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth}= require("./middleware/auth")
app.use(cookieParser());
app.use(express.json());

app.post("/signup", async(req,res)=>{
    
    try{
         validateSignUpData(req);


         const {firstName, lastName, emailId, password} = req.body;
         const passwordHash = await bcrypt.hash(password, 10)
         console.log(passwordHash);


         const user = new User({
          firstName,
          lastName,
          emailId,
          password:passwordHash

         });


         await user.save();
         res.status(201).send("User added successfull......");
    }catch(error){
         res.status(400).send("Error : "+ error.message)
    }
    
})
//login api...............
app.post("/login", async (req,res)=>{

  try{
    const {emailId, password} = req.body;
    
    const user = await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("INVALID CREDINTIALS.....")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
       //create JWT token.
       const token = await jwt.sign({_id: user._id}, "Vivek#1757", {expiresIn: "23h"});
     //  console.log(token);

      //add toekn to the user and send response to the user.
      res.cookie("token", token, {
        expires: new Date(Date.now()+10*3600000)
      });

      
      res.send("LogIn Successfull...!")
    }
    else{
      throw new Error("INVALID CREDINTIALS.....")
    }

  }catch(err){
    res.status(400).send("LOGIN ERROR: " + err.message)
  }
});


//Profile api
app.get("/profile", userAuth, async (req, res)=>{
  try{
    const user = req.user;
  
  res.send(user);
  }catch(err){
    res.status(400).send("ERROR: "+ err.message);
  }
});
app.post("/sendConnectionRequest", userAuth, async (req, res)=>{
  const user = req.user;
  console.log("Sending a connection request...");

  res.send(user.firstName+" Sent the connection request...")
})
connectDB().then(()=>{
    console.log("Database connection is established......");
    app.listen(3000, ()=>{
    console.log("This is my Backend server running on port 3000....")
});
}).catch((err)=>{
    console.error("Connection can not be established!!!")
});

