import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(500).json("You are not authenticated.");
    }
    jwt.verify(token, 'secretKey', (err, user)=>{
        if(err){
            return res.status(500).json("Token is not valid.");
        }
        req.user = user;
        next();
    });
};
export const verifyUser = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
                return res.status(500).json("You are not authorized.");
            }

    });
};
export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
                return res.status(500).json("You are not authorized.");
            }

    });
};