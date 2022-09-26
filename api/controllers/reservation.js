import Reservation from "../models/reservation.js";

import { createError } from "../Utils/error.js";
export const createReservation=async (req,res,next)=>{
    const newReservation = new Reservation(req.body)

    try {
        const saveReservation =  newReservation.save()
        res.status(200).json(saveReservation)
    } catch (err) {
        next(err)
    }

}

export const updateReservation=async (req,res,next)=>{

    try {
        const updateReservation =  await Reservation.findByIdAndUpdate(req.params.id, { $set : req.body},{new:true})
        res.status(200).json(updateReservation)
    } catch (err) {
        next(err)
    }

}

// export const deleteReservation2=async (req,res,next)=>{

//     try {
//         const DeleteReservation =  await Reservation.findByIdAndDelete(req.params.id, { $set : req.body},{new:true})
//         res.status(200).json(DeleteReservation)
//     } catch (err) {
//         next(err)
//     }

// }
export const deleteReservation=async (req,res,next)=>{
    const id =req.params.id.toString().trim();
    try {
        await Reservation.findByIdAndRemove(id);
        res.status(200).json("Reservation annulée");
      } catch (err) {
        next(err);
      }

}

export const findReservation=async (req,res,next)=>{

    try {
        const findReservation = await Reservation.findById(req.params.id)
        res.status(200).json(findReservation)
    } catch (err) {
        next(err)
    }

}

export const getReservations = async (req, res, next) => {
    
    try {
      const Reservations = await Reservation.find(req.query).sort({ "confirmation": 1,"createdAt": -1});
      res.status(200).json(Reservations);
    } catch (err) {
      next(err);
    }
  };


  


// export const findAll =async (req,res,next)=>{
    
//     try {
//         const findReservation = await Reservation.find();
//         res.status(200).json(findReservation);
//     } catch (err) {
//         next(err);
//     }

// }