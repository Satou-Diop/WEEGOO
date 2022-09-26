import express from 'express';
import { createnewsletter,getnewsletter } from '../controllers/newsletter.js';

const router = express.Router();

//CREATE
router.post("/", createnewsletter);

//RECUPERER
router.get("/", getnewsletter);


export default router;