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
    let data = await TasksModel.create(reqBody);
    if (data) {
      res.status(200).json({ status: "success", data: data });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", data: error.massage });
  }
};

//all task
exports.allTask = async (req, res) => {
  try {
    let email = req.headers["email"];
    let data = await TasksModel.find({ email });
    // console.log(data)
    if (data) {
      res.status(200).json({ status: "success", data: data });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", data: error.massage });
  }
};

//delete task
exports.deleteTask = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await TasksModel.deleteOne({ _id: id });
    if (data) {
      res.status(200).json({ status: "success", data: data });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", data: error.massage });
  }
};

//update task
exports.updateStatus = async (req, res) => {
  try {
    let { id, status } = req.params;
    let data = await TasksModel.updateOne({ _id: id }, { status });
    // console.log(data)
    if (data) {
      res.status(200).json({ status: "success", data: data });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", data: error.massage });
  }
};

// listTaskByStatus
exports.listTaskByStatus = (req, res) => {
  let { status } = req.params;
  let email = req.headers["email"];
  TasksModel.aggregate([
    { $match: { status, email } },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        createdDate: {
            $dateToString: { date: "$createdDate", format: "%d-%m-%Y" },
        },
      },
    },
  ]).then((data) => {
      res.status(200).json({ status: "success", data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ status: "fail", data: error.massage });
    });
};
