const express = require("express");
const connectionRouter = express.Router();
const {userAuth}= require("../middleware/auth");
//const connectionRequest = require("../models/connectionRequest");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/users");


connectionRouter.post("/ConnectionRequest/send/:status/:toUserUd", userAuth, async (req, res)=>{
   try{
      
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserUd;
      const status = req.params.status;
      
      const allowedStatus = ["interested", "ignored"];

      if(!allowedStatus.includes(status)){
         return res.status(400).json({
            message : "INVALID STATUS TYPE",
            status
         })
      }
      const toUser = await User.findById(toUserId)
         if(!toUser){
            return res.status(404).json({
               message: "User not found"
            });
         }
      
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
         {fromUserId, toUserId},
         {fromUserId: toUserId , toUserId:fromUserId}
        ]
      });
      if(existingConnectionRequest){
         return res.status(400).send({message: "Connection Request Already Exists...."})
      }

      const connectionRequest = new ConnectionRequest({
         fromUserId,
         toUserId,
         status
      });
      
      const connectionData = await connectionRequest.save();

      res.json({
         message : req.user.firstName+" is "+ status + " in "+toUser.firstName,
         connectionData
      })

   }catch(err){
    res.status(400).send("ERROR: " + err.message)
   }
});
module.exports = connectionRouter;