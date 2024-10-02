import express from 'express';
import { getPlacementData } from '../controllers/tpcControllers/placementController.js';
const router = express.Router();

router.get('/get-placement-data', getPlacementData);

export default router;