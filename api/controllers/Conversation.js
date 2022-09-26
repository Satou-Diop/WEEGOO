import Conversation from "../models/Conversation.js";

export const createConversation=async (req,res,next)=>{
  let ConversationExist,ConversationExist2 = false;
  try {
   ConversationExist = await Conversation.findOne({ members: [req.body.senderId, req.body.receiverId]  });
   ConversationExist2 = await Conversation.findOne({ members: [req.body.receiverId, req.body.senderId] });
  } catch (err) {
      next(err)
  }  
   if(ConversationExist || ConversationExist2){
      return res.status(402).json({ message : "Conversation existant"})
   }
   
    
      try {
        const newConversation = new Conversation({
          members: [req.body.senderId, req.body.receiverId],
        });
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
      } catch (err) {
        res.status(500).json(err);
      }

}

export const getConversationOne = async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
          members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
      } catch (err) {
        res.status(500).json(err);
      }
    
  };

  export const getConversationTwo = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({
          members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)
      } catch (err) {
        res.status(500).json(err);
      }
  };