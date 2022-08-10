import express from 'express';
import {  deleteUser, findAllUser, findUser, updateUser } from '../controllers/user.js';
import { verifyToken , verifyUser} from '../Utils/VerifyToken.js';


const router = express.Router();

// router.get("/checkauthentification", verifyToken, (req,res,next)=>{
//     res.send("Vous etes authentifie !!!");
// });

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("Vous etes autorisee a supprimmer votre compte!!!");
// })

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//RECHERCHER
router.get("/:id", findUser);

//RECHERCHER TOUT
router.get("/", findAllUser);

export default router;