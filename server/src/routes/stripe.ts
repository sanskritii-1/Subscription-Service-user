import express from 'express';
import { createPaymentIntent, webhook } from '../controllers/stripe';
import { authMiddleware } from '../middleware/auth';
import { paymentValidationSchema } from '../validations/schemas';
import { ValidationMiddleware } from '../middleware/validation';

const router = express.Router();

router.post('/create-payment-intent', authMiddleware, ValidationMiddleware(paymentValidationSchema), createPaymentIntent);
router.post('/webhook', webhook);

export default router;
