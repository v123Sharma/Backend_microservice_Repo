const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type : String,
        required : true
    },
    emailId :{
        type: String,
        required : true,
        unique : true,
        lowercase: true,
        trim: true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("Invalid Email address" +value);
           }
        }
    },
    password:{
        type:String,
        required: true,
        validate(value){
           if(!validator.isStrongPassword(value)){
            throw new Error("Please provide strong password" +value);
           }
        }
    },
    age:{
        type: Number,
        min : 17,
        max : 85
    },
    gender:{
        type:String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("age data is not valid.....");
            }
        }
        
    },
    photoUrl:{
        type : String,
        default : "https://loremipsum.io/21-of-the-best-placeholder-image-generators/",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL "+ value);
            }
        }
    },
    about:{
        type: String,
        default: "Not mentioned anything about itself!"
    },
    skills:{
        type : [String],
        min:1,
        max:7
        

    }
},{
    timestamps: true
});
//const userModel = mongoose.model("User", userSchema);

//module.exports={userModel}    OR

module.exports = mongoose.model("User",userSchema)