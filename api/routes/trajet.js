import express from 'express';
import { createTrajet, deleteTrajet, findAll, findTrajet, findTrajetUrbain, getrajets, updateTrajet } from '../controllers/trajet.js';
import Trajet from '../models/trajet.js'
import { createError } from '../Utils/error.js';

const router = express.Router();

//CREATE
router.post("/", createTrajet);

//UPDATE
router.put("/:id", updateTrajet);


//DELETE
router.delete("/:id", deleteTrajet);

//RECHERCHER
router.get("/:id", findTrajet);
//router.get("/Urbain", findTrajetUrbain);

//RECHERCHER TOUT
router.get("/", getrajets);


export default router;