import express from 'express';
import { createTrajet, deleteTrajet, findTrajet, getrajets, getTrajetNumber, updateTrajet, updateTrajet2 } from '../controllers/trajet.js';
import Trajet from '../models/trajet.js'
import { createError } from '../Utils/error.js';

const router = express.Router();

//CREATE
router.post("/", createTrajet);

//UPDATE
router.put("/:id", updateTrajet);
router.put("/annuler/:id", updateTrajet2);

//DELETE
router.delete("/:id", deleteTrajet);

//RECHERCHER
router.get("/:id", findTrajet);
router.get("/Number/:conducteur_id", getTrajetNumber);

//RECHERCHER TOUT
router.get("/", getrajets);


export default router;