const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600
    },
});
module.exports = mongoose.model('OTP',OTPSchema) 