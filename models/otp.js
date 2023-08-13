const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    otpNum: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});

const otpModel = mongoose.model('Otp', otpSchema);

module.exports = otpModel;