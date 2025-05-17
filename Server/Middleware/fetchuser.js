const jwt = require('jsonwebtoken');
const JWT_SECRET = '123456789'; // Define your secret key

const fetchuser =(req,res,next)=>{
    const token =req.header('auth-token');
    if(!token){
        return res.status(401).send("please autheticate with valid token")
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next()
        
    } catch (error){  
        return res.status(401).send("please autheticate with valid token")
    }
}

module.exports=fetchuser;