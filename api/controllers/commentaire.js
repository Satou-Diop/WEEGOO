import commentaire from "../models/commentaire.js";

export const createcommentaire=async (req,res,next)=>{
    const newcommentaire = new commentaire(req.body)

    try {
        const savecommentaire = await newcommentaire.save()
        res.status(200).json(savecommentaire)
    } catch (err) {
        next(err)
    }

}

export const getcommentaire = async (req, res, next) => {
    try {
        const commentaires = await commentaire.find({
          id_conducteur: req.params.id_conducteur,
        }).sort({"createdAt": -1});
        res.status(200).json(commentaires);
      } catch (err) {
        res.status(500).json(err);
      }
    
  };

