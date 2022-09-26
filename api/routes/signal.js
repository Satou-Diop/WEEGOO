import express from 'express';
import { createsignal,deletesignal,findsignal,getsignal } from '../controllers/signal.js';

const router = express.Router();

//CREATE
router.post("/", createsignal);

//RECUPERER
router.get("/", getsignal);
router.get("/:id", findsignal);


router.delete("/:id", deletesignal);
export default router;