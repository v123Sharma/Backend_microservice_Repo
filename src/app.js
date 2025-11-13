//console.log("This is my first Backend Project!")
const express = require("express");

const {connectDB}=require("./config/database");
const app = express();

const User = require("./models/users");
app.use(express.json());

app.post("/signup", async(req,res)=>{
    const user = new User(req.body );
    try{
         await user.save();
         res.status(201).send("User added successfull......");
    }catch(err){
         res.status(400).send("Error while saving the user: ", err.messsage)
    }
    
})
//Get user by email
app.get("/user",async(req, res)=>{
        const userEmail = req.body.emailId;
        try{
          const user=  await User.findOne({emailId: userEmail});
          
          if(!user){
            res.status(404).send("User not found")
          }else{
               res.send(user);
          }
            
        }catch(err){
            res.status(400).send("Something went wrong!")
        }
});

//Get all the user
app.get("/feed",async(req,res)=>{
  try{
    const user = await User.find({});
    res.send(user)
  }catch(err){
        res.status(400).send("No data is feched! ")  
  }
});
connectDB().then(()=>{
    console.log("Database connection is established......");
    app.listen(3000, ()=>{
    console.log("This is my Backend server running on port 3000....")
});
}).catch((err)=>{
    console.error("Connection can not be established!!!")
});

