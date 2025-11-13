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
    }catch(error){
         res.status(400).send("Error while saving the user: "+ error.message)
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
app.delete('/users', async (req,res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully..... ")
  }catch(err){
       res.status(400).send("Something went wrong..")
  }
});


app.patch("/users/:userId", async (req, res)=>{
  const userId = req.params?.userId;
  const data = req.body;


  try{
      const ALLOWED_UPDATES=[
    "photoUrl", "about", "skills", "age"
  ]

  const isUpdateAllowed = Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k)
  );
  if(!isUpdateAllowed){
    throw new Error("These fileds can not be updated....");
  }
    if(data?.skills.length>10){
      throw new Error("Skills can not be added more than 10 ")
    }
     await User.findByIdAndUpdate(userId, data,{
      runValidators:true
     });
     res.send("User updated successfully");

  }catch(err){
    res.status(400).send("Something went wrong..."+err.message)
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

