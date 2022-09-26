import Message from "../models/Message.js";

export const createMessage=async (req,res,next)=>{
    const newMessage = new Message(req.body)

    try {
        const saveMessage = await newMessage.save()
        res.status(200).json(saveMessage)
    } catch (err) {
        next(err)
    }

}

export const getMessage = async (req, res, next) => {
    try {
        const messages = await Message.find({
          conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
      } catch (err) {
        res.status(500).json(err);
      }
    
  };

  export const getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({
          sender : "feedback"
        });
        res.status(200).json(messages);
      } catch (err) {
        res.status(500).json(err);
      }
    
  };