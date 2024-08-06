import express from "express";
import {
  addTask,
  getTask,
  removeTask,
  getAllTask,
} from "../controllers/taskController.js";
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post("/addTask", requireAuth, addTask);
router.get("/getTask", requireAuth, getTask);
router.get("/getAllTask", getAllTask);
router.post("/removeTask", requireAuth, removeTask);

export default router;
