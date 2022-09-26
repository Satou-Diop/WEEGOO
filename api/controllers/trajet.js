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

export const updateTrajet2=async (req,res,next)=>{
    const trajet= Trajet.findOne({
        _id: req.params.id })
    if(trajet){
        try {
            await Trajet.findByIdAndUpdate(req.params.id,{$inc:{ nombre_place_libre : req.body.nombre_place_libre }},
               { new: true })
           res.status(200).json("Annulation reussi")
       } catch (err) {
           next(err)
       }
    }else{
        res.status(200).json("Erreur ")
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

export const findTrajet=async (req,res,next)=>{

    try {
        const findTrajet = await Trajet.findById(req.params.id)
        
        res.status(200).json(findTrajet)
    } catch (err) {
        next(err)
    }

}

export const getrajets = async (req, res, next) => {
    const option =req.query.option
    switch(option){
    case "1" :   
    try {
     const { depart, destination,...others } = req.query;
    const trajets = await Trajet.find({
        ...others,
        
      },null,
      {sort: { createdAt : -1}})
      
      res.status(200).json(trajets);
    } catch (err) {
      next(err);
    } ;break;
    case "2" :        
    try {
    const { depart, destination,...others } = req.query;
    const trajets = await Trajet.find({
    ...others,
    
        },null,
        {sort: { prix_place : "1"}})
        
        res.status(200).json(trajets);
        } catch (err) {
        next(err);
        } ;break;
    case "3" :        
    try {
    const { depart, destination,...others } = req.query;
    const trajets = await Trajet.find({
    ...others,
    
        },null,
        {sort: { nombre_place_libre : "-1"}})
        
        res.status(200).json(trajets);
        } catch (err) {
        next(err);
        } ;break;
        default:        
        try {
        const { depart, destination,...others } = req.query;
        const trajets = await Trajet.find({
        ...others,
        
            },null,
            {sort: { prix_place : "1"}})
          
            res.status(200).json(trajets);
            } catch (err) {
            next(err);
            } ;break;
    } 
    
    
  };


  export const getTrajetNumber = async (req, res, next) => {
    try {
        const Trajets = await Trajet.find({
          conducteur_id: req.params.conducteur_id,
        });
        res.status(200).json(Trajets);
      } catch (err) {
        res.status(500).json(err);
      }
    
  };

export const findAll =async (req,res,next)=>{
    
    try {
        const findTrajet = await Trajet.find();
        res.status(200).json(findTrajet);
    } catch (err) {
        next(err);
    }

}