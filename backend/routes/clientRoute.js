import express from "express";
import {
  loginClient,
  registerClient,
  getAllClient,
  setApply,
  deleteClient,
} from "../controllers/clientController.js";
const router = express.Router();

router.post("/loginClient", loginClient);
router.post("/registerClient", registerClient);
router.get("/getAllClient", getAllClient);
router.put("/setApply", setApply);
router.post("/deleteClient", deleteClient);

export default router;
