import express from "express";
import { approveUser, rejectUser } from "../controllers/tpcControllers/approveRejectController.js";
import { addCompany, updateCompany } from "../controllers/tpcControllers/companyController.js";
import { addRole, updateRole, deleteRole, getRoles, getRoleById } from "../controllers/tpcControllers/rolesController.js";
import { createDepartment, getDepartments, getDepartmentById, updateDepartment } from '../controllers/tpcControllers/deptController.js';

import authMiddleware from "../middlewares/authMiddleware.js";
import checkTpcRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Route to approve a pending user
router.post("/approveUser", authMiddleware, checkTpcRole, approveUser);
router.post("/rejectUser", authMiddleware, checkTpcRole, rejectUser);

// from company controller
router.post('/add-company', authMiddleware, checkTpcRole, addCompany);
router.put('/update-company/:id', authMiddleware, checkTpcRole, updateCompany);

// from roles controller
router.post('/add-role', authMiddleware, checkTpcRole, addRole);
router.put('/update-role/:role_id', authMiddleware, checkTpcRole, updateRole);
router.delete('/delete-role/:role_id', authMiddleware, checkTpcRole, deleteRole);
router.get('/get-roles', authMiddleware, checkTpcRole, getRoles);
router.get('/get-role-by-id/:role_id', authMiddleware, checkTpcRole, getRoleById);

// from dept controller
router.post('/add-department',  authMiddleware, checkTpcRole, createDepartment);
router.get('/get-departments',  authMiddleware, checkTpcRole, getDepartments);
router.get('/departments/:dept_id',  authMiddleware, checkTpcRole, getDepartmentById);
router.put('/departments/:dept_id',  authMiddleware, checkTpcRole, updateDepartment);

export default router;
