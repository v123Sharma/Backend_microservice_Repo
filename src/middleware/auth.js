 const jwt = require("jsonwebtoken");
 const User = require("../models/users");
 const userAuth = async (req, res,next)=>{

    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is not Valid....!")
        }

        const decodedToken = await jwt.verify(token, "Vivek#1757");

        const {_id} = decodedToken;

        const user = await User.findById(_id);
        console.log(user)

        if(!user){
            throw new Error("User not found...")
        }
        req.user =user;
        next();

    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
    
};

module.exports={
    userAuth
}