/**
 * task-menage projects / tasks user controller
 * Date : 21/03/2023
 * auth: Ismile Sardar
 */

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
      res.status(400).json({ status: "fail", data: error });
    });
};
