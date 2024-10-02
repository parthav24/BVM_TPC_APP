import express from 'express';
import { studentRegister, login } from '../controllers/authController.js';
const router = express.Router();

router.post('/studentRegister', studentRegister);
router.post('/login', login);

export default router;