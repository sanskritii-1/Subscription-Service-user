import Stripe from 'stripe';
import { Request, Response } from 'express';

const stripe = new Stripe('sk_test_51POayCP5gAI9NfaClujHfCfssJYtu7fQ30mlnZ29Bk2HfoiusIDHCDsJCBATmkMFUHoOgwEMhTWVwSCBvWozdqDn00tnni3x0Z', {
    apiVersion: '2024-06-20'
});

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in cents
      currency: 'usd',
    });

    console.log('PaymentIntent created:', paymentIntent);
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error); // Log the error details
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unknown error occurred' });
    }
  }
};

