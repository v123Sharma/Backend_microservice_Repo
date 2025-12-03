const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation")
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {userAuth}= require("../middleware/auth")





authRouter.post("/signup", async(req,res)=>{
    
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


      const savedUser  =  await user.save();
       const token =  await savedUser.getJWT(); 

      res.cookie("token", token, {
        expires: new Date(Date.now()+10*3600000)
      });
      
         res.status(201).json({
          message :"User added successfull......",
         data: savedUser});
    }catch(error){
         res.status(400).send("Error : "+ error.message)
    }
    
});

//login api...............
authRouter.post("/login", async (req,res)=>{
  try{
    const {emailId, password} = req.body; 
    const user = await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("INVALID CREDINTIALS.....")
    }
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid){
       //create JWT token.
       const token = await user.getJWT();
      //add toekn to the user and send response to the user.
      res.cookie("token", token, {
        expires: new Date(Date.now()+10*3600000)
      });
      res.send(user)
    }
    else{
      throw new Error("INVALID CREDINTIALS.....")
    }
  }catch(err){
    res.status(400).send("LOGIN ERROR: " + err.message)
  }
});

authRouter.post("/logout", async (req, res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("Logged Out...!")
});


module.exports= authRouter;