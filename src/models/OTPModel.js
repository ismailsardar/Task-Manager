/**
 * task-menage projects OTP Model
 * Date : 3/04/2023
 * auth: Ismile Sardar
 */
const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
    createdDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const OTPModel = mongoose.model("otps", otpSchema);
module.exports = OTPModel;
