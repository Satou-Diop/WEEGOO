import express from 'express';
import { createNotification,getNotification, getNotificationNumber, openNotification, updateNotification } from '../controllers/Notification.js';

const router = express.Router();

//CREATE
router.post("/", createNotification);

//RECUPERER
router.get("/:user", getNotification);
router.get("/number/:user", getNotificationNumber);
router.get("/open/:id", openNotification);

//
router.put("/:id", updateNotification);


export default router;