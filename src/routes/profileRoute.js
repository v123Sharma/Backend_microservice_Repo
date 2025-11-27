const express = require("express");
const profileRouter = express.Router();
const {userAuth}= require("../middleware/auth")
const {validateProfileData} = require("../utils/validation");

//Profile View api.....
profileRouter.get("/profile/view", userAuth, async (req, res)=>{
  try{
    const user = req.user;
  
  res.send(user);
  }catch(err){
    res.status(400).send("ERROR: "+ err.message);
  }
});
//profile Edit api.....
profileRouter.patch("/profile/edit", userAuth, async (req, res)=>{
try{
   if(!validateProfileData(req)){
    throw new Error("Invalid Request..")
   }

   const activeUser = req.user;
  //  console.log(activeUser);
   Object.keys(req.body).forEach((key)=>(activeUser[key]=req.body[key]));
  // console.log(activeUser);
   await activeUser.save();
   res.json({message: `${activeUser.firstName}, Your Profile edited successfully...!`, data:activeUser});

}catch(err){
    res.status(400).send("ERROR: "+ err.message)
}
});
module.exports =  profileRouter;