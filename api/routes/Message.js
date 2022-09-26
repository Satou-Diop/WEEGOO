import express from 'express';
import { createMessage,getMessage, getMessages } from '../controllers/Message.js';

const router = express.Router();

//CREATE
router.post("/", createMessage);

//RECUPERER
router.get("/:conversationId", getMessage);
router.get("/feedback/all", getMessages);


export default router;