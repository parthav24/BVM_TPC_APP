import express from 'express';
import { tpcRegister } from '../controllers/tpoControllers/tpcManageController.js';
import { tpoRegister } from '../controllers/tpoControllers/tpoManageController.js';
import { checkTpoRole } from '../middlewares/roleMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment } from '../controllers/tpoControllers/deptController.js';

import { approveUser, rejectUser } from "../controllers/tpcControllers/approveRejectController.js";
import { editCandidateDetails, getApprovedCandidates, getPendingCandidates } from "../controllers/tpcControllers/userController.js";

const router = express.Router();

router.post('/tpoRegister', tpoRegister);
router.post('/tpcRegister', authMiddleware, checkTpoRole, tpcRegister);

// from dept controller
router.post('/add-department', authMiddleware, checkTpoRole, createDepartment);
router.get('/get-departments', authMiddleware, checkTpoRole, getDepartments);
router.get('/get-department-by-id/:dept_id', authMiddleware, checkTpoRole, getDepartmentById);
router.put('/update-department/:dept_id', authMiddleware, checkTpoRole, updateDepartment);
router.delete('/delete-department/:dept_id', authMiddleware, checkTpoRole, deleteDepartment);


// // approve and reject user applications routes
// router.post("/approveUser", authMiddleware, checkTpoRole, approveUser);
// router.post("/rejectUser", authMiddleware, checkTpoRole, rejectUser);
// router.post("/edit-candidate-details", authMiddleware, checkTpoRole, editCandidateDetails);

// //Route for get pending and approved students 
// router.get("/get-approved-candidates", authMiddleware, checkTpoRole, getApprovedCandidates);
// router.get("/get-pending-candidates", authMiddleware, checkTpoRole, getPendingCandidates);

export default router;