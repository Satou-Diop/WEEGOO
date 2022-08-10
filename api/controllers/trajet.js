import mongoose from "mongoose";
import Trajet from "../models/trajet.js";

export const createTrajet=async (req,res,next)=>{
    const newTrajet = new Trajet(req.body)

    try {
        const saveTrajet =  newTrajet.save()
        res.status(200).json(saveTrajet)
    } catch (err) {
        next(err)
    }

}

export const updateTrajet=async (req,res,next)=>{

    try {
         await Trajet.findByIdAndUpdate(req.params.id,{ $set: req.body },
            { new: true })
        res.status(200).json("Trajet modifie")
    } catch (err) {
        next(err)
    }

}


export const deleteTrajet=async (req,res,next)=>{
    const id =req.params.id.toString().trim();
    try {
        await Trajet.findByIdAndRemove(id);
        res.status(200).json("Trajet has been deleted.");
      } catch (err) {
        next(err);
      }

}

export const findTrajet=async (req,res)=>{

    try {
        const findTrajet = await Trajet.findById(req.params.id)
        
        res.status(200).json(findTrajet)
    } catch (err) {
        next(err)
    }

}

export const getrajets = async (req, res, next) => {
    const { depart, destination, ...others } = req.query;
    try {
      const trajets = await Trajet.find({
        ...others,
        
      }).limit(req.query.limit);
      res.status(200).json(trajets);
    } catch (err) {
      next(err);
    }
  };


export const findTrajetUrbain=async (req,res,next)=>{
const depart=req.query.depart.split(",") 
    try {
        const list =  await Promise.all(
            depart.map(point_depart => {
            return Trajet.countDocuments({point_depart:point_depart});
            })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }

}


export const findAll =async (req,res,next)=>{
    
    try {
        const findTrajet = await Trajet.find();
        res.status(200).json(findTrajet);
    } catch (err) {
        next(err);
    }

}