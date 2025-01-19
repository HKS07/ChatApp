import dotenv from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import {Server} from "socket.io";
import http from "http";

import {rootSocketHandlers} from "./socket/index.js";
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

//Express server
const app = express();

// Http server beign attaced to Socket.Io 
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET","POST"],
    allowedHeaders: ["Content-Type","Authorization"]
  },
});

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
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

// Initialize Socket.IO Handlers
rootSocketHandlers(io);

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
