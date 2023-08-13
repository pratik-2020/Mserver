const express = require('express');
const sendOtp = require('../controller/otp/sendOtp');
const router = express.Router();
const otpRouter = express.Router();

otpRouter.get('/', (req, res) => {
    console.log("Here is it");
    sendOtp(req, res);
});

module.exports = otpRouter;