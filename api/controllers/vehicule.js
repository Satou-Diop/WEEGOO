import Vehicule from "../models/Vehicule.js";


export const createVehicule=async (req,res,next)=>{
    const newVehicule = new Vehicule(req.body)

    try {
        const saveVehicule = await newVehicule.save()
        res.status(200).json(saveVehicule)
    } catch (err) {
        next(err)
    }

}

export const getVehicule = async (req, res, next) => {
    try {
        const Vehicules = await Vehicule.find({
          conducteur: req.params.conducteur,
        });
        res.status(200).json(Vehicules);
      } catch (err) {
        res.status(500).json(err);
      }
    
  };