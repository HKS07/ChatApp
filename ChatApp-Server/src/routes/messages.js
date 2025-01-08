import express from "express";
import {
  getMessagesByConversationId,
  sendMessage,
  deleteMessage,
  updateMessage,
} from "../controllers/messagesController.js";
const router = express.Router();

router.post("/", getMessagesByConversationId);
router.post("/send", sendMessage);
router.delete("/", deleteMessage);
router.put("/", updateMessage);

export { router };
