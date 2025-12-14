const express = require("express");
const { userAuth } = require("../middleware/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constants");

paymentRouter.post("/payment/create", userAuth, async(req, res)=>{
        try{

           const {membershipType} = req.body;
           const {firstName, lastName, emailId} = req.user;


       const order = await razorpayInstance.orders.create({
        amount : membershipAmount[membershipType]*100,
        currency: "INR",
        receipt : "receipt#1",
        notes : {
            firstName ,
            lastName ,
            emailId,
            membershipType : membershipType
        },
       });

       console.log(order)

       const paymentData = new Payment({
        userid : req.user._id,
        orderId : order.id,
        status: order.status,
        amount : order.amount,
        currency: order.currency,
        receipt : order.receipt,
        notes : order.notes
       });

       const savedPayments = await paymentData.save();

       res.json({...savedPayments.toJson()});

        }catch(err){
            return res.status(500).json({msg : err.message});
        }
});

module.exports = paymentRouter;