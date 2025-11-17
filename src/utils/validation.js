const validator = require("validator");

const validateSignUpData=(req)=>{

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Please enter the name...")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email address does not exsist....")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }
}
const validateProfileData=(req)=>{
      const allowedEditFields = [
        "firstName",
        "lastName",
        "age",
        "skills",
        "gender",
        "about"
      ]
      const isEditAllowed = Object.keys(req.body).every((value)=>{
      return  allowedEditFields.includes(value);
      });
      return isEditAllowed;
}
module.exports ={
    validateSignUpData,
    validateProfileData
}