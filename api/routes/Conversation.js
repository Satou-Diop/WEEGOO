import express from 'express';
import { createConversation,getConversationOne, getConversationTwo} from '../controllers/Conversation.js';

const router = express.Router();

//CREATE
router.post("/", createConversation);

//RECUPERER
router.get("/:userId", getConversationOne);

//RECUPERER
router.get("/find/:firstUserId/:secondUserId", getConversationTwo);


export default router;