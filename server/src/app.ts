import express, { Request, Response, Express,NextFunction } from 'express';
import cors from 'cors';
import connectDB from './config/dbConfig';
import authenticationRoute from './routes/authentication';
import paymentHistoryRoutes from './routes/paymentHistory';
import resourceRoute from './routes/resource';
import planRoute from './routes/plan'
import subscriptionRoutes from './routes/subscription';
import { ErrorMiddleware } from './middlewares/error';
import stripeRoutes from './routes/stripe';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { swaggerOptions } from './config/swagger';

// Create an Express application
const app: Express = express();
const swaggerDoc = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
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

import { authMiddleware } from './middlewares/auth';
app.get('/protected', authMiddleware, (req: Request, res: Response) => {
    res.send('Hello, from protected route');
});



export default app;
