import express from 'express';
import { createReservation, deleteReservation, findReservation, getReservations, updateReservation } from '../controllers/Reservation.js';
import Reservation from '../models/reservation.js'
import { createError } from '../Utils/error.js';

const router = express.Router();

//CREATE
router.post("/", createReservation);

//UPDATE
router.put("/:id", updateReservation);

//DELETE
router.delete("/:id", deleteReservation);

//RECHERCHER
router.get("/:id", findReservation);


//RECHERCHER TOUT
router.get("/", getReservations);


export default router;