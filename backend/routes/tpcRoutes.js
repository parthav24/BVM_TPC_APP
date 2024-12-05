import express from "express";
import { approveUser, rejectUser } from "../controllers/tpcControllers/approveRejectController.js";
import { addCompany, updateCompany } from "../controllers/tpcControllers/companyController.js";
import upload from "../config/multerJDConfig.js";
import { addRole, updateRole, deleteRole, getRoles, getRoleById } from "../controllers/tpcControllers/rolesController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import { checkTpcOrTpoRole, checkTpcRole } from "../middlewares/roleMiddleware.js";

import { getApplicationData, getLastRoundStudents, getSelectedCandidates, handleCandidatesRound, completeDrive, selectCandidate } from "../controllers/tpcControllers/applicationController.js";
import { addPlacementData } from "../controllers/tpcControllers/placementController.js";
import { editCandidateDetails, getApprovedCandidates, getPendingCandidates } from "../controllers/tpcControllers/userController.js";
import { getTpcProfile, getTpoName, getTpcMembers } from "../controllers/tpcControllers/tpcProfileController.js";

const router = express.Router();

// Route to approve a pending user
router.post("/approveUser", authMiddleware, checkTpcRole, approveUser);
router.post("/rejectUser", authMiddleware, checkTpcRole, rejectUser);
router.post("/edit-candidate-details", authMiddleware, checkTpcRole, editCandidateDetails);

//Route for get pending and approved students 
router.get("/get-approved-candidates", authMiddleware, checkTpcRole, getApprovedCandidates);
router.get("/get-pending-candidates", authMiddleware, checkTpcRole, getPendingCandidates);

// from company controller
router.post('/add-company', upload.single('company_JD'), authMiddleware, checkTpcOrTpoRole, addCompany);
router.put('/update-company/:id', authMiddleware, checkTpcOrTpoRole, updateCompany);

// from roles controller
router.post('/add-role', authMiddleware, checkTpcRole, addRole);
router.put('/update-role/:role_id', authMiddleware, checkTpcRole, updateRole);
router.delete('/delete-role/:role_id', authMiddleware, checkTpcRole, deleteRole);
router.get('/get-roles', authMiddleware, checkTpcOrTpoRole, getRoles);
router.get('/get-role-by-id/:role_id', authMiddleware, checkTpcRole, getRoleById);

// modify application status and round_reached
router.put('/move-next-round', authMiddleware, checkTpcRole, handleCandidatesRound);
router.put('/complete-drive', authMiddleware, checkTpcRole, completeDrive);
// router.put('/select-candidate', authMiddleware, checkTpcRole, selectCandidate);
router.get('/get-selected-candidates', authMiddleware, checkTpcRole, getSelectedCandidates);
router.get('/get-last-round-candidates', authMiddleware, checkTpcRole, getLastRoundStudents);
router.get('/get-all-round-candidates', authMiddleware, checkTpcRole, getApplicationData);

//placement data routes
router.post('/add-placement-data', authMiddleware, checkTpcRole, addPlacementData);

// tpc profile
router.get('/get-profile', authMiddleware, checkTpcRole, getTpcProfile);
router.get('/get-tpo-name', authMiddleware, checkTpcRole, getTpoName);
router.get('/get-tpc-members', authMiddleware, checkTpcRole, getTpcMembers);
// router.put('/profile', authMiddleware, updateUserProfile);

export default router;
