import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userControllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../config/multerResumeConfig.js'; // Import multer config
import { submitApplication } from '../controllers/userControllers/applicationController.js';
import { checkStudentRole } from '../middlewares/roleMiddleware.js';
import { getCompanyDetails } from '../controllers/userControllers/companyController.js';
const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

// Route for submitting an application, with multer middleware for resume upload
router.post('/submit-application', upload.single('resumeFile'), submitApplication);

// display company
router.get('/get-companies',authMiddleware,checkStudentRole,getCompanyDetails)

export default router;