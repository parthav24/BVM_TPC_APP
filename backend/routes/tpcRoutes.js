import express from "express";
import { approveUser, rejectUser } from "../controllers/tpcControllers/approveRejectController.js";
import { addCompany, updateCompany } from "../controllers/tpcControllers/companyController.js";
import upload from "../config/multerJDConfig.js";
import { addRole, updateRole, deleteRole, getRoles, getRoleById } from "../controllers/tpcControllers/rolesController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import { checkTpcRole } from "../middlewares/roleMiddleware.js";

import { getSelectedCandidates, moveNextRound, rejectCandidate, selectCandidate } from "../controllers/tpcControllers/applicationController.js";
import { addPlacementData } from "../controllers/tpcControllers/placementController.js";
import { editCandidateDetails, getApprovedCandidates, getPendingCandidates } from "../controllers/tpcControllers/userController.js";

const router = express.Router();

// Route to approve a pending user
router.post("/approveUser", authMiddleware, checkTpcRole, approveUser);
router.post("/rejectUser", authMiddleware, checkTpcRole, rejectUser);
router.post("/edit-candidate-details", authMiddleware, checkTpcRole, editCandidateDetails);

//Route for get pending and approved students 
router.get("/get-approved-candidates", authMiddleware, checkTpcRole, getApprovedCandidates);
router.get("/get-pending-candidates", authMiddleware, checkTpcRole, getPendingCandidates);

// from company controller
router.post('/add-company', upload.single('company_JD'), authMiddleware, checkTpcRole, addCompany);
router.put('/update-company/:id', authMiddleware, checkTpcRole, updateCompany);

// from roles controller
router.post('/add-role', authMiddleware, checkTpcRole, addRole);
router.put('/update-role/:role_id', authMiddleware, checkTpcRole, updateRole);
router.delete('/delete-role/:role_id', authMiddleware, checkTpcRole, deleteRole);
router.get('/get-roles', authMiddleware, checkTpcRole, getRoles);
router.get('/get-role-by-id/:role_id', authMiddleware, checkTpcRole, getRoleById);

// modify application status and round_reached
router.put('/move-next-round', authMiddleware, checkTpcRole, moveNextRound);
router.put('/reject-candidate', authMiddleware, checkTpcRole, rejectCandidate);
router.put('/select-candidate', authMiddleware, checkTpcRole, selectCandidate);
router.get('/get-selected-candidates', authMiddleware, checkTpcRole, getSelectedCandidates);

//placement data routes
router.post('/add-placement-data', authMiddleware, checkTpcRole, addPlacementData);

export default router;
