const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");

const getSecretRoomId=(userId, targetUserId)=>{
   return crypto
                .createHash("sha256")
                .update([userId, targetUserId,].sort().join("_"))
                .digest("hex");
}

const initializeSocket=(server)=>{
    const io= socket(server, {
    cors : {
        origin : "http://localhost:5173"
    }
});
    io.on("connection", (socket)=>{
            
        socket.on("joinChat", ({userId , targetUserId, firstName})=>{
            const roomId = getSecretRoomId(userId, targetUserId);
            console.log(firstName + " Joined with : " + roomId)
            socket.join(roomId);

        });

        socket.on("sendMessages", async({firstName , userId,targetUserId, text})=>{
            
            //save chat in the databse
            try{
                const roomId =getSecretRoomId(userId , targetUserId);
                console.log(firstName + ":" + text )

                let chat = await Chat.findOne({
                    participants : {$all : [userId, targetUserId]},
                });
                if(!chat){
                    chat = new Chat({
                        participants : [userId,targetUserId],
                        messages : []
                    })
                }
                chat.messages.push({
                    senderId : userId,
                    text
                });
                await chat.save();
                io.to(roomId).emit("messageRecieved", {firstName, text});
            }catch(err){
                console.error(err);
            }
        });

        socket.on("disconnect", ()=>{});
    });
};

module.exports ={initializeSocket}