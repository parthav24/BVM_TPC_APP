import express from "express";
import { approveUser, rejectUser } from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkTpcRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Route to approve a pending user
router.post("/approveUser", authMiddleware, checkTpcRole, approveUser);
router.post("/rejectUser", authMiddleware, checkTpcRole, rejectUser);

export default router;
