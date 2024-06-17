import { Router } from 'express';
import { getPlans } from '../controllers/plans';

const router = Router();

router.get('/manage-subscription', getPlans);

export default router;
