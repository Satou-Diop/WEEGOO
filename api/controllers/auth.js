import User from "../models/user.js";
import  bcrypt from 'bcrypt';
import dotenv from "dotenv";
import { createError } from "../Utils/error.js";
import jwt from "jsonwebtoken";


export const inscrire= async (req,res,next)=>{
let userExist = false;
try {
 userExist = await User.findOne({login : req.body.login});
} catch (err) {
    next(err)
}  
 if(userExist){
    return res.status(402).json({ message : "Utilisateur existant"})
 }
try {
    const salt =bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    const newUser= new User({
        id_user:req.body.id_user,
        nom:req.body.nom,
        prenom:req.body.prenom,
        date_naissance:req.body.date_naissance,
        login:req.body.login,
        telephone:req.body.telephone,
        password: hash
    })
    await newUser.save()
    res.status(200).send("Utilisateur cree")
} catch (err) {
    next(err)
}
}

export const connexion= async (req,res,next)=>{
    
    try {
        const salt =bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        const user= await User.findOne({
            login:req.body.login })
        if(!user) return next(createError(400,"User not found"));
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(404,"Login or password incorrect"));
        
         const token = jwt.sign({ id : user._id }, process.env.JWT , {expiresIn : "60s",})
         //Modifiaction
         if(req.cookies[`${user._id}`]){
            req.cookies[`${user._id}`]=""
         }
        const {password, updatedAt, ...otherDetails}=user._doc;
        res.cookie(String(user.id), token, { httpOnly:true , expires : new Date(Date.now() + 1000 * 60),}).status(200).json({ ...otherDetails});
       
          return res.status(200).json({ message : "Log Succefully !!!", user: user, token});
         //FinModification

        // const {password, createdAt,updatedAt, ...otherDetails}=user._doc;
        //res.cookie("access_token", token, { httpOnly:true ,}).status(200).json({ ...otherDetails});
       
    } catch (err) {
        next(err)
    }
    }

export const getUser= async (req,res,next) => {

    try {
        const user = await User.findById(req.params.id, "-password")
        res.status(200).json(user)
    } catch (err) {
      return next (err);
    }
   
    }

// export const verifyToken= async (req,res,next) => {
       
//     const cookies =req.headers.cookie;
//     console.log(cookies);
//     if(!cookies){
//         return res.status(404).json({ message : "No coockies "});
//     } 
//     const token = cookies.split("=")[1];
//     console.log(token);
// if(!token){

//     return res.status(404).json({ message : "No token "});
// } 
//     jwt.verify(String(token),  process.env.JWT, (err,user)=>{
//         if(err){
//            return res.status(400).json({ message : "Invalid token "});
//         }
//         req.id=user.id;
//     });
//      next();
// }




//     export const RefreshToken= async (req,res,next) => {
//     const cookies =req.headers.cookie;

//     const prevtoken = cookies.split("=")[1];
//         if(!prevtoken){
//             return res.status(400).json({message : "No token"})
//         }
//         jwt.verify(String(prevtoken), process.env.JWT, (err,user)=>{
//             if(err){
//                return res.status(403).json({ message : "Token failed "});
//             }
//             res.clearCookie(`${user.id}`)
//             req.cookies[`${user.id}`]="";

//             const token = jwt.sign({id : user.id}, process.env.JWT, {
//                 expiresIn : "60s"
//             })

//             const {password, createdAt,updatedAt, ...otherDetails}=user._doc;
//             res.cookie(String(user.id), token, { httpOnly:true , expires : new Date(Date.now() + 1000 * 60),}).status(200).json({ ...otherDetails});
//                 req.id  = user.id 
//         });
//         next();
//         }    