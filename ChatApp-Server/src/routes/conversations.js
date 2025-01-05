import express from "express";
import {
  getConversationById,
  createConversation,
} from "../controllers/conversationController.js";
const router = express.Router();

router.post("/", createConversation);
router.post("/getAll", getConversationById);

export {router};