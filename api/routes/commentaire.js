import express from 'express';
import { createcommentaire,getcommentaire } from '../controllers/commentaire.js';

const router = express.Router();

//CREATE
router.post("/", createcommentaire);

//RECUPERER
router.get("/:id_conducteur", getcommentaire);


export default router;