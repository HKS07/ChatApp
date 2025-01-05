import dotenv from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import {
  chatsRoutes,
  contactsRoutes,
  profileRoutes,
  messagesRoutes,
  authRoutes,
  requestsRoutes,
  conversationsRoutes,
} from "./routes/index.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Use the routes with their respective paths
app.use("/chat", chatsRoutes);
app.use("/contact", contactsRoutes);
app.use("/profile", profileRoutes);
app.use("/message", messagesRoutes);
app.use("/conversation", conversationsRoutes);
app.use("/auth", authRoutes);
app.use("/requests", requestsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
