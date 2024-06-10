import express, { Request, Response, Express } from 'express';
import cors from "cors";
import connectDB from './config/dbConfig';

// Create an Express application
const app:Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

export default app;