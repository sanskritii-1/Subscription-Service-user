import express from 'express';
import { createPaymentIntent, webhook } from '../controllers/stripe';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/create-payment-intent', authMiddleware, createPaymentIntent);
router.post('/webhook', webhook);

export default router;
