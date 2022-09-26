import signal from "../models/signal.js";

export const createsignal=async (req,res,next)=>{
    const newsignal = new signal(req.body)

    try {
        const savesignal = await newsignal.save()
        res.status(200).json(savesignal)
    } catch (err) {
        next(err)
    }

}

export const getsignal = async (req, res, next) => {
    try {
        const signals = await signal.find().sort({"createdAt": -1});
        res.status(200).json(signals);
      } catch (err) {
        res.status(500).json(err);
      }
    
  };

  
export const findsignal=async (req,res,next)=>{

    try {
        const findsignal = await signal.findById(req.params.id)
        
        res.status(200).json(findsignal)
    } catch (err) {
        next(err)
    }

};


export const deletesignal=async (req,res,next)=>{
    const id =req.params.id.toString().trim();
    try {
        await signal.findByIdAndRemove(id);
        res.status(200).json("signal has been deleted.");
      } catch (err) {
        next(err);
      }

}

