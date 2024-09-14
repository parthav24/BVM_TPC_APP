import express from "express";
import { approveUser, rejectUser } from "../controllers/adminControllers/approveRejectController.js";
import { addCompany,updateCompany } from "../controllers/adminControllers/companyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkTpcRole from "../middlewares/roleMiddleware.js";
import { createDepartment, getDepartments, getDepartmentById, updateDepartment } from '../controllers/adminControllers/deptController.js';

const router = express.Router();

// Route to approve a pending user
router.post("/approveUser", authMiddleware, checkTpcRole, approveUser);
router.post("/rejectUser", authMiddleware, checkTpcRole, rejectUser);

// from company controller
router.post('/add-company', authMiddleware, checkTpcRole, addCompany);
router.put('/update-company/:id',authMiddleware ,checkTpcRole, updateCompany);

// from dept controller
router.post('/departments',  authMiddleware, checkTpcRole, createDepartment);
router.get('/departments',  authMiddleware, checkTpcRole, getDepartments);
router.get('/departments/:dept_id',  authMiddleware, checkTpcRole, getDepartmentById);
router.put('/departments/:dept_id',  authMiddleware, checkTpcRole, updateDepartment);

export default router;
