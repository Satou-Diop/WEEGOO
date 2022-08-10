import jwt from "jsonwebtoken";
import { createError } from "./error.js";


export const verifyToken =(req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"Vous n'etes pas authentifie"));
    }

    jwt.verify(token, process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"Token invalid"));
        req.user=user;
        next()
    });
};

export const verifyUser = (req,res,next)=>{
  verifyToken(req,res,next,()=>{
   if(req.user.id === req.params.id){
    next()
   } else{
     next(createError(403,"Vous n'etes pas autorisee"));
   }
  })  
}