const express = require('express');
const router = require('../routers/professor');
require('../db/db');
const app = express();

app.use(express.json());
const db = client.db('MServer');
app.use('/professor', (req, res) => {
    router(req, res);
})
app.get('/', (req, res) => {
    res.status(200).send('Welcome');
});

app.listen(3001, () => {
    console.log("Server started at 3001");
})