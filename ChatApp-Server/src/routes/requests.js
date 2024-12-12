import express from "express";
import {
  sendRequest,
  getAllRequests,
  updateStatus,
} from "../controllers/requestController.js";
const router = express.Router();

router.post("/sendRequest", sendRequest);
router.post("/getRequests", getAllRequests);
router.post("/updateStatus", updateStatus);

export { router };
