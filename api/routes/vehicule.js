import express from 'express';
import { getVehicule } from '../controllers/Vehicule.js';
import multer from "multer";
import Vehicule from "../models/Vehicule.js";


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

//CREATE
router.post("/",upload.single("photo"), async (req,res,next)=>{
    
    const newVehicule = new Vehicule({
        marque : req.body.marque,
        modele : req.body.modele,
        description : req.body.description,
        conducteur : req.body.conducteur,
        photo: req.file?.path })

    try {
        const saveVehicule = await newVehicule.save()
        res.status(200).json(saveVehicule)
    } catch (err) {
        next(err)
    }

});

//RECUPERER
router.get("/:conducteur", getVehicule);


export default router;