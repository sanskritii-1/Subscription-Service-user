import { Router } from 'express';
import { getPlans } from '../controllers/plans';

const router = Router();

router.get('/subscription-plans', getPlans);

export default router;
