import express from "express";
import { approveUser, rejectUser } from "../controllers/adminControllers/approveRejectController.js";
import { addCompany,updateCompany } from "../controllers/adminControllers/companyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkTpcRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Route to approve a pending user
router.post("/approveUser", authMiddleware, checkTpcRole, approveUser);
router.post("/rejectUser", authMiddleware, checkTpcRole, rejectUser);

// from company controller
router.post('/add-company', authMiddleware, checkTpcRole, addCompany);
router.put('/update-company/:id',authMiddleware ,checkTpcRole, updateCompany);

export default router;
