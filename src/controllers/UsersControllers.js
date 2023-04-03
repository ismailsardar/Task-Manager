/**
 * task-menage projects / tasks user controller
 * Date : 21/03/2023
 * auth: Ismile Sardar
 */

const jwt = require("jsonwebtoken");
const UsersModel = require("../models/UsersModel");
const OTPModel = require("../models/OTPModel");
const SendEmailUtility = require("../utility/SMTPEmail");

// registration
exports.registration = (req, res) => {
  let reqBody = req.body;
  UsersModel.create(reqBody)
    .then((data) => {
      res.status(200).json({ status: "success", data: data });
    })
    .catch((error) => {
      // console.log(error)
      res.status(200).json({ status: "fail", data: error });
    });
};

//login
exports.login = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await UsersModel.aggregate([
      { $match: reqBody },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
        },
      },
    ]);
    // console.log(result.length);
    if (result) {
      if (result.length > 0) {
        let payload = {
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
          data: result[0]["email"],
        };
        let token = jwt.sign(payload, "SecretKey1234567890");
        res
          .status(200)
          .json({ status: "success", data: result[0], token: token });
      } else {
        res.status(401).json({ status: "unauthorized" });
      }
    }
  } catch (error) {
    res.status(400).json({ status: "fail", data: error.message });
  }
};

// profileUpdate
exports.profileUpdate = async (req, res) => {
  try {
    let email = req.headers["email"];
    let reqBody = req.body;
    let data = await UsersModel.updateOne({ email }, reqBody);
    // console.log(updateData)
    if (data) {
      res.status(200).json({ status: "success", data: data });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", data: error });
  }
};

// profile Details
exports.profileDetails = async (req, res) => {
  try {
    let email = req.headers["email"];
    let result = await UsersModel.aggregate([
      { $match: { email } },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
          password: 1,
        },
      },
    ]);
    // console.log(updateData)
    if (result) {
      res.status(200).json({ status: "success", data: result[0] });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", data: error });
  }
};

// Recover Verify Email
exports.RecoverVerifyEmail = async (req, res) => {
  let email = req.params.email;
  let OTP = Math.floor(100000 + Math.random() * 900000);
  // console.log(OTP)
  try {
    let userCount = await UsersModel.aggregate([
      { $match: { email } },
      { $count: "total" },
    ]);
    if (userCount.length > 0) {
      await OTPModel.create({ email, otp: OTP });
      // Email Send
      let SendEmail = await SendEmailUtility(
        email,
        OTP,
        "Task Manager PIN Verification"
      );
      res.status(200).json({ status: "success", data: SendEmail });
    } else {
      res.status(200).json({ status: "fail", data: "User Not Found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({ status: "fail=", error: error.message });
  }
};

// Recover Verify OTP
exports.VerifyOTP = async (req, res) => {
  let email = req.params.email;
  let otp = req.params.otp;
  let status = 0;
  let updateStatus = 1;

  try {
    let otpCount = await OTPModel.aggregate([
      { $match: { email, otp, status } },
      { $count: "total" },
    ]);

    if (otpCount.length > 0) {
      let OTPUpdate = await OTPModel.updateOne(
        { email, otp, status },
        { status: updateStatus }
      );
      res.status(200).json({ status: "success", data: OTPUpdate });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid OTP" });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({ status: "fail", error: error.message });
  }
};

// Reset Password
exports.ResetPassword = async (req, res) => {
  let { email, otp, password } = req.body;
  let status = 1;
  try {
    let otpCount = await OTPModel.aggregate([
      { $match: { email, otp, status } },
      { $count: "total" },
    ]);

    if (otpCount.length > 0) {
      let updatePass = await UsersModel.updateOne({ email }, { password });
      res.status(200).json({ status: "success", data: updatePass });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid Request" });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({ status: "fail", error: error.message });
  }
};
