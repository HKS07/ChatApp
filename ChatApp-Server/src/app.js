import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { chatsRoutes, contactsRoutes, profileRoutes, messagesRoutes, authRoutes, requestsRoutes } from './routes/index.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());  

// Test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Use the routes with their respective paths
app.use('/chat', chatsRoutes);
app.use('/contact', contactsRoutes);
app.use('/profile', profileRoutes);
app.use('/message', messagesRoutes);
app.use('/auth', authRoutes);
app.use('/requests', requestsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
