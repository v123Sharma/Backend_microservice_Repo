const mongoose = require("mongoose");

const paymentOrderSchema = new mongoose.Schema({
   
     paymentId: {
         type : String
     },
     userId : {
      type : mongoose.Types.ObjectId,
      ref : "User",
      required : true
     },
     orderId : {
        type : String,
        required : true,
        unique : true
     },
     status : {
        type : String,
        enum: ["created", "paid", "failed"],
        required : true
     },
     amount : {
        type : Number,
        required : true
     },
     currency : {
        type : String,
        required : true
     },
     receipt : {
        type : String,
        required : true
     },
     notes : {
        firstName: {
            type : String
        },
        lastName : {
            type : String
        },
        membershipType : {
            type : String,
            required : true
        }
     }
},{timestamps:true});

module.exports = new mongoose.model("Payment", paymentOrderSchema);