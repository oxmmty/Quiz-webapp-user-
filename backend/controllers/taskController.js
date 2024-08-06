import { createTransport } from "nodemailer";
import dotenv from "dotenv";

import taskModel from "../models/taskModel.js";

dotenv.config();

const addTask = async (req, res) => {
  const {
    subCategory,
    subHeading,
    question,
    answerA,
    answerB,
    answerC,
    answerD,
    refData,
    correctAnswer,
    imgAData,
    imgBData,
    imgCData,
    imgDData,
    imgQData,
    imgRData,
  } = req.body;

  const newTask = new taskModel({
    subCategory,
    subHeading,
    question,
    answerA,
    answerB,
    answerC,
    answerD,
    refData,
    correctAnswer,
    imgAData,
    imgBData,
    imgCData,
    imgDData,
    imgQData,
    imgRData,
    completed: false,
  });
  newTask
    .save()
    .then(() => {
      return res.status(200).json({ id: newTask.id });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

const removeTask = (req, res) => {
  const { taskid } = req.body;
  console.log("id: ", taskid);
  taskModel
    .findByIdAndDelete(taskid)
    .then(() => res.status(200).json({ message: "Task deleted successfully" }))
    .catch((error) => res.status(501).json({ message: error.message }));
};
``;

const getTask = (req, res) => {
  taskModel
    .find({ userId: req.user.id })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(501).json({ message: error.message }));
};

const getAllTask = (req, res) => {
  taskModel
    .find({}) // Empty filter object to fetch all documents
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ message: error.message })); // Changed error code to 500, which is more appropriate for server errors
};
export { addTask, getTask, removeTask, getAllTask };
