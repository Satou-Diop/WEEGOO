import technicien from "../models/technicien.js";
import  bcrypt from 'bcrypt';
import { createError } from "../Utils/error.js";
import jwt from "jsonwebtoken";


export const inscrire= async (req,res,next)=>{
let technicienExist = false;
try {
 technicienExist =  await technicien.findOne({login : req.body.login});
} catch (err) {
    next(err)
}  
 if(technicienExist){
    return res.status(402).json({ message : "Technicien existant"})
 }
try {
    const salt =bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    const newtechnicien= new technicien({
        nom:req.body.nom,
        prenom:req.body.prenom,
        genre:req.body.genre,
        login:req.body.login,
        telephone:req.body.telephone,
        password: hash
    })
    await newtechnicien.save()
    res.status(200).send("Technicien cree")
} catch (err) {
    next(err)
}
}

export const connexion= async (req,res,next)=>{
    
    try {
        const salt =bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        const Technicien= await technicien.findOne({
            login:req.body.login })
        if(!Technicien) return next(createError(400,"Technicien not found"));
        const isPasswordCorrect = await bcrypt.compare(req.body.password, Technicien.password);
        if (!isPasswordCorrect) return next(createError(404,"Login or password incorrect"));
        
         const token = jwt.sign({ id : Technicien._id }, process.env.JWT , {expiresIn : "60s",})
         if(req.cookies[`${Technicien._id}`]){
            req.cookies[`${Technicien._id}`]=""
         }
        const {password, updatedAt, ...otherDetails}=Technicien._doc;
        res.cookie(String(Technicien.id), token, { httpOnly:true , expires : new Date(Date.now() + 1000 * 60),}).status(200).json({ ...otherDetails});
       
          return res.status(200).json({ message : "Log Succefully !!!", technicien: Technicien, token});
       
    } catch (err) {
        next(err)
    }
    }


export const updatePassword= async (req,res,next)=>{

    try {
        const salt =bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.new_password,salt);
        const Technicien1= await technicien.findOne({
            login:req.body.login })
        const isPasswordCorrect = await bcrypt.compare(req.body.password, Technicien1.password);
        if (!isPasswordCorrect) return next(createError(404,"Password incorrect"));
        try {
            const Technicien= await technicien.findByIdAndUpdate(req.params.id,{ $set: {password :hash}},
                { new: true })
                const token = jwt.sign({ id : Technicien._id }, process.env.JWT , {expiresIn : "60s",})
                const {password, updatedAt, ...otherDetails}=Technicien._doc;
                res.cookie(String(Technicien.id), token, { httpOnly:true , expires : new Date(Date.now() + 1000 * 60),}).status(200).json({ ...otherDetails});
            res.status(200).json({message : "Mot de passe modifié", technicien: Technicien, token})
        } catch (err) {
            next(err)
        }
            
        
    } catch (err) {
        next(err)
    }
    }
    
export const gettechnicien= async (req,res,next) => {

    try {
        const technicien = await technicien.findById(req.params.id, "-password")
        res.status(200).json(technicien)
    } catch (err) {
      return next (err);
    }
   
    }
    export const findAlltechnicien =async (req,res,next)=>{
    
        try {
            const findtechnicien = await technicien.find(req.query);
            res.status(200).json(findtechnicien);
        } catch (err) {
            next(err);
        }
    
    }