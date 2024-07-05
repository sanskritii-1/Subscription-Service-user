import Stripe from 'stripe';
import { NextFunction, Request, Response } from 'express';
import Transaction from '../models/transaction';
import { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/appConfig';
import { getEnvVariable } from '../utils';
import { CustomRequest } from '../middleware/auth';

const stripe = new Stripe('sk_test_51POayCP5gAI9NfaClujHfCfssJYtu7fQ30mlnZ29Bk2HfoiusIDHCDsJCBATmkMFUHoOgwEMhTWVwSCBvWozdqDn00tnni3x0Z', {
  apiVersion: '2024-06-20'
});

export const createPaymentIntent = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: 'inr',
    });

    const newTransact = new Transaction({
      userId: (req.id as JwtPayload).id,
      planId: req.body.planId,
      paymentIntentId: paymentIntent.id,
      amount: amount,
      status: 'initiated',
      // status: paymentIntent.status,
    })
    await newTransact.save();

    console.log('PaymentIntent created:');
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};


export const webhook = async (req: Request, res: Response, next: NextFunction) => {

  console.log('reached webhook')
  const sig = req.headers['stripe-signature'];
  if (!sig) {
    console.log('no sig error')
    return next({ status: 400, message: "webhook error: invalid signature" })
  }

  let event;

  try {
    const endpointSecret = getEnvVariable(config.WEBHOOK_SECRET);
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    return next(err);
  }

  let paymentIntent = event.data.object as Stripe.PaymentIntent;
  let status: string = '';
  let receipt = '';
  let paymentIntentId = paymentIntent.id;

  switch (event.type) {
    case 'payment_intent.succeeded':
      status = paymentIntent.status;
      console.log('in webhook', event.type);
      break;

    case 'payment_intent.payment_failed':
      console.log('in webhook', event.type);
      status = 'failed';
      console.log(`Failure reason: ${paymentIntent.last_payment_error?.message}`);
      break;

    case 'charge.succeeded':
      let chargeIntent = event.data.object as Stripe.Charge
      console.log('paymentintent in charge suc: ', paymentIntent)
      receipt = chargeIntent.receipt_url || '';
      console.log('receipt: ', receipt);
      paymentIntentId = chargeIntent.payment_intent as string;
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  console.log('payment intent: ', paymentIntent);

  if (status) {
    await Transaction.findOneAndUpdate({ paymentIntentId }, { status })
  }
  if(receipt){
    await Transaction.findOneAndUpdate({ paymentIntentId }, { receipt })
  }

  res.send();
}