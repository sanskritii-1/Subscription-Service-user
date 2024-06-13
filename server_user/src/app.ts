import express, { Request, Response, Express } from 'express';
import cors from "cors";
import connectDB from './config/dbConfig';
import authenticationRoute from "./routes/authentication"
import { authMiddleware } from './middleware/auth';

// Create an Express application
const app:Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authenticationRoute);

connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

app.get('/protected', authMiddleware, (req: Request, res: Response) => {
    res.send('Hello, from protected route');
});

export default app;