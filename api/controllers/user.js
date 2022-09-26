import User from "../models/user.js";
import jwt from "jsonwebtoken";


export const updateUser=async (req,res,next)=>{

    try {
        const user= await User.findByIdAndUpdate(req.params.id,{ $set: req.body },
            { new: true })
        const token = jwt.sign({ id : user._id }, process.env.JWT , {expiresIn : "60s",})
        const {password, updatedAt, ...otherDetails}=user._doc;
        res.cookie(String(user.id), token, { httpOnly:true , expires : new Date(Date.now() + 1000 * 60),}).status(200).json({ ...otherDetails});
        res.status(200).json({user: user})
    } catch (err) {
        next(err)
    }

}
export const updateNote=async (req,res,next)=>{

    try {
        const user= await User.findByIdAndUpdate(req.params.id,{$push:{ note:   req.body.note }},
            { new: true })
        
        res.status(200).json("Mise a jour reussie")
    } catch (err) {
        next(err)
    }

}

export const deleteUser=async (req,res)=>{

    try {
        const DeleteUser =  await User.findByIdAndDelete(req.params.id, { $set : req.body},{new:true})
        res.status(200).json(DeleteUser)
    } catch (err) {
        next(err)
    }

}

export const findUser=async (req,res,next)=>{

    try {
        const findUser = await User.findById(req.params.id)
        res.status(200).json(findUser)
    } catch (err) {
        next(err)
    }

}


export const findAllUser =async (req,res,next)=>{
    
    try {
        const findUser = await User.find(req.query);
        res.status(200).json(findUser);
    } catch (err) {
        next(err);
    }

}