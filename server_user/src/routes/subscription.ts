import express from 'express';
import { subscribe } from '../controllers/subscription';
import { unsubscribe } from '../controllers/subscription';
import { authMiddleware } from '../middleware/auth';
const router = express.Router();

router.post('/subscribe', authMiddleware, subscribe);
router.post('/unsubscribe', authMiddleware, unsubscribe);

export default router;
