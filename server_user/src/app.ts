import express, { Request, Response, Express } from 'express';
import cors from "cors";
import connectDB from './config/dbConfig';
import authenticationRoute from "./routes/authentication"
import resourceRoute from './routes/resources';
import { authMiddleware } from './middleware/auth';
// const mongoose=require("mongoose");

// Create an Express application
const app:Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authenticationRoute);
app.use('/api', resourceRoute);

connectDB();


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

app.get('/protected', authMiddleware, (req: Request, res: Response) => {
    res.send('Hello, from protected route');
});

export default app;