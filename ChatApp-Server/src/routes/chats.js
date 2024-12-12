import express from "express";
import {
  getAllChats,
  addChat,
  updateChat,
  deleteChat,
} from "../controllers/chatsController.js";
const router = express.Router();

router.get("/", getAllChats);
router.post("/", addChat);
router.put("/:chatId", updateChat);
router.delete("/:chatId", deleteChat);

export { router };
