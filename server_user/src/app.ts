import express, { Request, Response, Express,NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/dbConfig';
import authenticationRoute from './routes/authentication';
import paymentHistoryRoutes from './routes/paymentHistoryRoutes';
import resourceRoute from './routes/resources';
import planRoute from './routes/plans'
import subscriptionRoutes from './routes/subscription';
import { ErrorMiddleware } from './middleware/error';
import stripeRoutes from './routes/stripe';

// Create an Express application
const app: Express = express();

app.use(cors());
app.use('/api/webhook', express.raw({type:'application/json'}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authenticationRoute);
app.use('/api', paymentHistoryRoutes); // Include payment history routes
app.use('/api', resourceRoute);
app.use('/api', planRoute);
app.use('/api', subscriptionRoutes);
app.use('/api', stripeRoutes);
app.use(ErrorMiddleware);

connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

import { authMiddleware } from './middleware/auth';
app.get('/protected', authMiddleware, (req: Request, res: Response) => {
    res.send('Hello, from protected route');
});


// import Stripe from 'stripe';
// import Transaction from './models/transaction';
// const stripe = new Stripe('sk_test_51POayCP5gAI9NfaClujHfCfssJYtu7fQ30mlnZ29Bk2HfoiusIDHCDsJCBATmkMFUHoOgwEMhTWVwSCBvWozdqDn00tnni3x0Z', {
//     apiVersion: '2024-06-20'
//   });
// const endpointSecret = "whsec_Y4595A8DxTiDgZZK0zU9YOnBcZETmJly";
// // const endpointSecret = "whsec_21d875ae490f8ae9c364210a271a1190d0ad18a2f901b9fdedc0a65fc49c9d02";

// app.post('/webhook', async(req: Request, res: Response, next: NextFunction) => {
//     console.log('reached webhook')
//   const sig = req.headers['stripe-signature'];
//     console.log("sig: ", sig);
//   if(!sig ){
//     console.log('no sig error')
//     return next({status:400, message: "webhook error: invalid signature"})
//   }
  
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err:any) {
//     console.log("in webhook catch", err.message)
//     res.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   let paymentIntent = event.data.object as Stripe.PaymentIntent;
//   let status;
//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       // const paymentIntent = event.data.object;
//       status = paymentIntent.status;
//       console.log('in webhook', event.type);
//       // Then define and call a function to handle the event payment_intent.amount_capturable_updated
//       break;
//       case 'payment_intent.payment_failed':
//         console.log('in webhook', event.type);
//       status = paymentIntent.status;
//       // const paymentIntentCanceled = event.data.object;
//       // Then define and call a function to handle the event payment_intent.canceled
//       break;
    
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   await Transaction.findOneAndUpdate({paymentIntentId: paymentIntent.id}, {status: status})

//   // Return a 200 response to acknowledge receipt of the event
//   res.send();
// })

export default app;
