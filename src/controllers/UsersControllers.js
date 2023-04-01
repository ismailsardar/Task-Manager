/**
 * task-menage projects / tasks user controller
 * Date : 21/03/2023
 * auth: Ismile Sardar
 */

const jwt = require("jsonwebtoken");
const UsersModel = require("../models/UsersModel");

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
        res.status(200)
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
