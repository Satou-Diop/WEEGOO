import Notification from "../models/Notification.js";

export const createNotification=async (req,res,next)=>{
    const newNotification = new Notification(req.body)

    try {
        const saveNotification = await newNotification.save()
        res.status(200).json(saveNotification)
    } catch (err) {
        next(err)
    }

}

export const getNotification = async (req, res, next) => {
    try {
        const Notifications = await Notification.find({
          user: req.params.user,
        }).sort({"createdAt": -1});
        res.status(200).json(Notifications);
      } catch (err) {
        res.status(500).json(err);
      }
    
  };

  export const getNotificationNumber = async (req, res, next) => {
    try {
        const Notifications = await Notification.find({
          user: req.params.user,
          isOpen : false,
        });
        res.status(200).json(Notifications);
      } catch (err) {
        res.status(500).json(err);
      }
    
  };
  export const openNotification= async (req, res, next) => {
    try {
        const Notifications = await Notification.find({
          _id: req.params.id,
        });
        res.status(200).json(Notifications);
      } catch (err) {
        res.status(500).json(err);
      }
    
  };

  export const updateNotification=async (req,res,next)=>{

    try {
         await Notification.findByIdAndUpdate(req.params.id,{ $set: req.body },
            { new: true })
        res.status(200).json("Notification ouvert")
    } catch (err) {
        next(err)
    }

}