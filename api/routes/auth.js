import express from 'express';
import { connexion, getUser, inscrire} from '../controllers/auth.js';

const router =express.Router();

router.post("/",inscrire);
router.post("/log", connexion);
router.get("/user/:id", getUser)
// router.get("/refresh", RefreshToken,verifyToken,getUser)


export default router