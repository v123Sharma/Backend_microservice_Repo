//console.log("This is my first Backend Project!")
const express = require("express");

const app = express();


// app.use("/test",(req,res)=>{
//      res.send("Hi I am from server how are you");
// });

app.get("/user",(req, res)=>{
    res.send({"firstname":"Vivek", "LastName": "Sharma"})
});
app.post("/user",(req,res)=>{
    console.log("Please send the data")
    res.send("I saved the changes in the database")
});

app.delete("/user",(req, res)=>{
    res.send("I am delete call....")
})



app.listen(3000, ()=>{
    console.log("This is my Backend server running on port 3000....")
});