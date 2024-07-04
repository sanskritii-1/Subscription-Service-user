import Stripe from 'stripe';
import { NextFunction, Request, Response } from 'express';
import Transaction from '../models/transaction';
import { JwtPayload } from 'jsonwebtoken';

const stripe = new Stripe('sk_test_51POayCP5gAI9NfaClujHfCfssJYtu7fQ30mlnZ29Bk2HfoiusIDHCDsJCBATmkMFUHoOgwEMhTWVwSCBvWozdqDn00tnni3x0Z', {
  apiVersion: '2024-06-20'
});

interface CustomRequest extends Request {
  id?: string | JwtPayload;
}
export const createPaymentIntent = async (req: CustomRequest, res: Response): Promise<void> => {
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
    console.error('Error creating PaymentIntent:', error); // Log the error details
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unknown error occurred' });
    }
  }
};


// const endpointSecret = "whsec_21d875ae490f8ae9c364210a271a1190d0ad18a2f901b9fdedc0a65fc49c9d02";
const endpointSecret = "whsec_Y4595A8DxTiDgZZK0zU9YOnBcZETmJly";

export const webhook = async (req: Request, res: Response, next: NextFunction) => {

  console.log('reached webhook')
  const sig = req.headers['stripe-signature'];
  if (!sig) {
    console.log('no sig error')
    return next({ status: 400, message: "webhook error: invalid signature" })
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.log("in webhook catch", err.message)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
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