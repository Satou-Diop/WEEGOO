import express from 'express';
import {  deleteUser, findAllUser, findUser, updateNote, updateUser } from '../controllers/user.js';
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/user.js";

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Uploads/')},
      filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname )
    }
  })

  const photoFilter=(req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
const upload = multer({ 
    storage: storage,
    fileFilter: photoFilter
})

router.post("/upload/:id", upload.single("photo"), async(req,res,next)=>{
    console.log(req.file)
    try {
        const user= await User.findByIdAndUpdate(req.params.id,{ photo: req.file.path },
           { new: true })
           const token = jwt.sign({ id : user._id }, process.env.JWT , {expiresIn : "60s",})
           const {password, updatedAt, ...otherDetails}=user._doc;
           res.cookie(String(user.id), token, { httpOnly:true , expires : new Date(Date.now() + 1000 * 60),}).status(200).json({ ...otherDetails});
           res.status(200).json({user: user})
   } catch (err) {
       next(err)
   }
});

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("Vous etes autorisee a supprimmer votre compte!!!");
// })

//UPDATE
router.put("/:id", updateUser);
router.put("/note/:id", updateNote);
//DELETE
router.delete("/:id", deleteUser);

//RECHERCHER
router.get("/:id", findUser);

//RECHERCHER TOUT
router.get("/", findAllUser);

export default router;