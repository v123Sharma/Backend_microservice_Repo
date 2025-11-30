const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middleware/auth")
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/users")


const USER_SAFE_DATA = "firstName lastName emailId photoUrl";

//GET all the pending connection requests of a ActiveUser
userRouter.get("/user/requests/pending", userAuth, async(req, res)=>{
    try{
       const activeUser = req.user;

       const connectionRequest = await ConnectionRequest.find({
        toUserId : activeUser._id,
        status : "interested"
       }).populate("fromUserId", USER_SAFE_DATA);

       res.json({
        message: "Data fectched successfully....!",
        data: connectionRequest
       })
    }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
});
userRouter.get("/user/requests/connections", userAuth, async (req, res)=>{

    try{
       const activeUser = req.user;
       const connectionRequest = await ConnectionRequest.find({
        $or:[
             {toUserId: activeUser._id, status : "accepted"},
             {fromUserId : activeUser._id, status: "accepted"}
        ]
       })
       .populate("fromUserId", USER_SAFE_DATA)
       .populate("toUserId", USER_SAFE_DATA);

       const data = connectionRequest.map((row)=>{
        if(row.fromUserId._id.toString()===activeUser._id.toString()){
            return row.toUserId;
        }
             return row.fromUserId;
        });
       res.json({data});


    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/feed", userAuth, async(req,res)=>{
    try{
        const activeUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit =limit>50 ? 50 :limit;
        const skip = (page-1)*limit;

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId: activeUser._id},
                {toUserId: activeUser._id}
            ]
        })
        .select("fromUserId  toUserId");

        const hideUserFromFeed = new Set();

        connectionRequest.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });
          
        const userFeed = await User.find({
          $and:[
            {_id : {$nin :Array.from(hideUserFromFeed)}},
            {_id : {$ne : activeUser._id}}
          ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.send(userFeed);



    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})


module.exports = userRouter;