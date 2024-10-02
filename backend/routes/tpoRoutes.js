import express from 'express';
import { tpcRegister } from '../controllers/tpoControllers/tpcManageController.js';
import { tpoRegister } from '../controllers/tpoControllers/tpoManageController.js';
import { checkTpoRole } from '../middlewares/roleMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createDepartment, getDepartments, getDepartmentById, updateDepartment } from '../controllers/tpoControllers/deptController.js';

const router = express.Router();

router.post('/tpoRegister', tpoRegister);
router.post('/tpcRegister', authMiddleware, checkTpoRole, tpcRegister);

// from dept controller
router.post('/add-department', authMiddleware, checkTpoRole, createDepartment);
router.get('/get-departments', authMiddleware, checkTpoRole, getDepartments);
router.get('/get-department-by-id/:dept_id', authMiddleware, checkTpoRole, getDepartmentById);
router.put('/update-department/:dept_id', authMiddleware, checkTpoRole, updateDepartment);

export default router;