import User from "../models/user.js";


export const updateUser=async (req,res,next)=>{

    try {
        const user= await User.findByIdAndUpdate(req.params.id,{ $set: req.body },
            { new: true })
        res.status(200).json({user: user})
    } catch (err) {
        next(err)
    }

}

export const deleteUser=async (req,res)=>{

    try {
        const DeleteUser =  await User.findByIdAndDelete(req.params.id, { $set : req.body},{new:true})
        res.status(200).json(DeleteUser)
    } catch (err) {
        next(err)
    }

}

export const findUser=async (req,res)=>{

    try {
        const findUser = await User.findById(req.params.id)
        res.status(200).json(findUser)
    } catch (err) {
        next(err)
    }

}


export const findAllUser =async (req,res,next)=>{
    
    try {
        const findUser = await User.find();
        res.status(200).json(findUser);
    } catch (err) {
        next(err);
    }

}