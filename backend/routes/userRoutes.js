import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userControllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../config/multerResumeConfig.js'; // Import multer config
import { getApplicationByUidAndCompanyId, getAllApplications, submitApplication } from '../controllers/userControllers/applicationController.js';
import { checkStudentRole, checkTpcOrStudentRole } from '../middlewares/roleMiddleware.js';
import { getCompanyDetails, getCompanyRoleDetails } from '../controllers/userControllers/companyController.js';
import { getPlacementDataByUID } from '../controllers/tpcControllers/placementController.js';
const router = express.Router();

router.get('/get-profile', authMiddleware, checkStudentRole, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

// Route for submitting an application, with multer middleware for resume upload
// Uploading resume is pending 
router.post('/submit-application', upload.single('resume'), authMiddleware, checkStudentRole, submitApplication);
router.get('/get-all-application', authMiddleware, checkStudentRole, getAllApplications);

// display company
router.get('/get-companies', authMiddleware, checkTpcOrStudentRole, getCompanyDetails)
router.get('/get-company-roles/:company_id', authMiddleware, checkStudentRole, getCompanyRoleDetails)

// get placement data by UID
router.get('/get-placementdata-by-uid', authMiddleware, checkStudentRole, getPlacementDataByUID)
router.get('/get-applicationdata-by-uid-company-id/:company_id', authMiddleware, checkStudentRole, getApplicationByUidAndCompanyId)

export default router;