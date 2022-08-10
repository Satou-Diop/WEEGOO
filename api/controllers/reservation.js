import Reservation from "../models/reservation.js";

export const createReservation=async (req,res,next)=>{
    const newReservation = new Reservation(req.body)

    try {
        const saveReservation =  newReservation.save()
        res.status(200).json(saveReservation)
    } catch (err) {
        next(err)
    }

}

export const updateReservation=async (req,res)=>{

    try {
        const updateReservation =  await Reservation.findByIdAndUpdate(req.params.id, { $set : req.body},{new:true})
        res.status(200).json(updateReservation)
    } catch (err) {
        next(err)
    }

}

export const deleteReservation=async (req,res)=>{

    try {
        const DeleteReservation =  await Reservation.findByIdAndDelete(req.params.id, { $set : req.body},{new:true})
        res.status(200).json(DeleteReservation)
    } catch (err) {
        next(err)
    }

}

export const findReservation=async (req,res)=>{

    try {
        const findReservation = await Reservation.findById(req.params.id)
        res.status(200).json(findReservation)
    } catch (err) {
        next(err)
    }

}

export const getReservations = async (req, res, next) => {
    const { id_trajet, id_passager, ...others } = req.query;
    try {
      const Reservations = await Reservation.find({
        ...others,
        
      }).limit(req.query.limit);
      res.status(200).json(Reservations);
    } catch (err) {
      next(err);
    }
  };




export const findAll =async (req,res,next)=>{
    
    try {
        const findReservation = await Reservation.find();
        res.status(200).json(findReservation);
    } catch (err) {
        next(err);
    }

}