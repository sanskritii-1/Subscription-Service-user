import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import connectDB from './config/dbConfig';
import authenticationRoute from './routes/authentication';
import paymentHistoryRoutes from './routes/paymentHistoryRoutes';
import resourceRoute from './routes/resources';
import { authMiddleware } from './middleware/auth';

// Create an Express application
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authenticationRoute);
app.use('/api', paymentHistoryRoutes); // Include payment history routes
app.use('/api', resourceRoute);

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});

app.get('/protected', authMiddleware, (req: Request, res: Response) => {
  res.send('Hello, from protected route');
});

import User from './models/user';
import UserResource from './models/userResources';
app.post('/saveUserResources', async (req: Request, res: Response) => {
    const { email, reso } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create user resource entry
        const userResource = new UserResource({
            userId: user._id,
            leftResources: reso // Example value for leftResources
        });

        // Save user resource
        await userResource.save();

        return res.status(200).json({ message: 'User resources saved successfully' });
    } catch (error) {
        console.error('Error saving user resources:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default app;
