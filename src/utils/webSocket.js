const socket = require("socket.io");
const crypto = require("crypto");

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

        socket.on("sendMessages", ({firstName , userId,targetUserId, text})=>{
            const roomId =getSecretRoomId(userId , targetUserId);
            console.log(firstName + ":" + text )
            io.to(roomId).emit("messageRecieved", {firstName, text});
        });

        socket.on("disconnect", ()=>{});
    });
};

module.exports ={initializeSocket}