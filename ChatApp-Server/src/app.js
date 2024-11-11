require("dotenv").config();
const { chatsRoutes, contactsRoutes, profileRoutes, messagesRoutes } = require('./routes/index');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());  // Use bodyParser to handle JSON requests
app.use(router);  // Mount the router

// Test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Use the routes with their respective paths
app.use('/chat', chatsRoutes);
app.use('/contacts', contactsRoutes);
app.use('/profile', profileRoutes);
app.use('/message', messagesRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
