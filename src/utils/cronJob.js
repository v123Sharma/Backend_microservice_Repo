const cron = require("node-cron")
const {subDays, startOfDay, endOfDay} = require("date-fns");
const ConnectionRequest = require("../models/connectionRequest");

cron.schedule("0 8 * * *", async()=>{
    try{
     const yesterday = subDays(new Date(), 0)
     const yesterdayStart = startOfDay(yesterday);
     const yesterdayEnd = endOfDay(yesterday);

     const pendingRequest =  await ConnectionRequest.find({
        status : "interested",
        createdAt : {
            $gte : yesterdayStart,
            $lt  : yesterdayEnd
        },
     }).populate("fromUserId toUserId")

     const listOfEmails = [...new Set(pendingRequest.map((req)=>req.toUserId.emailId))]


     for( const emails of listOfEmails){
        //will do when we would have aws access
     }

    }catch(err){
         console.error(err);
    }
});