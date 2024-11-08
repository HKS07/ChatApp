// require('dotenv').config();
const loadEnv = require('./utils/loadEnv')
loadEnv();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.get('/',(req,res) => {
    res.send('hello world')
})

app.listen(port,() => {
    console.log(`Server listening on port ${port}`);
});