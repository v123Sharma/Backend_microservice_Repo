//My password => oJfEfuENwNYfUJK9
const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://Vivek_db_user:oJfEfuENwNYfUJK9@namastebackend.cjhsqua.mongodb.net/devTinder"
    );
}


module.exports={
    connectDB,
}
