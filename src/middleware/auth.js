 const adminAuth = (req, res,next)=>{
    console.log("We are checking admin auth")
    const token = "xyj";
    const isAuthenticated = token ==="xyj";
    if(!isAuthenticated){
        res.status(401).send("Unathorised request");
    }else{
        next();
    }
};

module.exports={
    adminAuth,
}