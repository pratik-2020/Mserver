const express = require('express');
// const router = require('../routers/professor');
// require('../db/db');
const app = express();
app.use(express.json());
const router = require('../routers/professor');
const otpRouter = require('../routers/otp');
let url = "mongodb+srv://pratik:pratik@cluster0.2f1wudi.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection is successful!!");
}).catch((er) => {
    console.log(er.message);
});
app.use('/professor', (req, res) => {
    router(req, res);
});
app.use('/otp', (req, res) => {
    otpRouter(req, res);
});
app.get('/', (req, res) => {
    res.status(200).send('Welcome');
});

app.listen(3001, () => {
    console.log("Server started at 3001");
})