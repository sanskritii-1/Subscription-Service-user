import { Router } from 'express';
import { createPlan, updatePlan, deletePlan } from '../controllers/adminController';
import { authMiddleware,adminMiddleware } from '../middlewares/utils/auth';

const router = Router();

router.post('/manage-subscription', authMiddleware, adminMiddleware, createPlan);
router.put('/manage-subscription/:id', authMiddleware, adminMiddleware, updatePlan);
router.delete('/manage-subscription/:id', authMiddleware, adminMiddleware, deletePlan);

export default router;
