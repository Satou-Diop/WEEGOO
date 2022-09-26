import newsletter from "../models/newsletter.js";

export const createnewsletter=async (req,res,next)=>{
    const newnewsletter = new newsletter(req.body)

    try {
        const savenewsletter = await newnewsletter.save()
        res.status(200).json(savenewsletter)
    } catch (err) {
        next(err)
    }

}

export const getnewsletter = async (req, res, next) => {
    try {
        const newsletters = await newsletter.find().sort({"createdAt": -1});
        res.status(200).json(newsletters);
      } catch (err) {
        res.status(500).json(err);
      }
    
  };

