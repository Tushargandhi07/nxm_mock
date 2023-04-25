const jwt = require('jsonwebtoken');

const authenticate = (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(token){
            const decoded= jwt.verify(token,"tushar");
            if(decoded){
                req.user= decoded.userID;
                next();
            }
            else{
                res.status(400).send({"msg":"Invalid"});
            }
        }
        else{
            
            res.send("login first");
        }
    } catch (error) {
        res.send("login again")
    }
}

module.exports={
    authenticate
}