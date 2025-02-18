import express from "express";
import { loginOAuth, login, guestLogin} from "../controllers/authController.js";
const router = express.Router();

router.post("/loginOAuth", loginOAuth);
router.post("/login", login);
router.post("/guestLogin", guestLogin);

export { router };
