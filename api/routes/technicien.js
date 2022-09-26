import express from 'express';
import { connexion, findAlltechnicien, gettechnicien, inscrire, updatePassword} from '../controllers/technicien.js';

const router =express.Router();

router.post("/",inscrire);
router.post("/log", connexion);
router.get("/get/:id", gettechnicien)
router.get("/", findAlltechnicien)
router.put("/:id", updatePassword)
// router.get("/refresh", RefreshToken,verifyToken,gettechnicien)


export default router