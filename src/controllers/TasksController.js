/**
 * task-menage projects / Task manager
 * Date : 24/03/2023
 * auth: Ismile Sardar
 */

const TasksModel = require("../models/TasksModel");

// task create
exports.createTask = async (req, res) => {
  try {
    let reqBody = req.body;
    reqBody.email = req.headers["email"];
    let data = TasksModel.create(reqBody);
    if (!data) {
        res.status(400).json({ status: "fail", data: error });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
  } catch (error) {
    console.log(error);
  }
};
