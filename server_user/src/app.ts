import express, { Request, Response, Express } from 'express';
import cors from "cors";
import connectDB from './config/dbConfig';
import planRoute from "./routes/plans";

// Create an Express application
const app:Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', planRoute);

connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});
import Plan from './models/Plan';
app.post('/add-plan', async (req: Request, res: Response)=>{
    try {
        const data = new Plan(req.body);
        await data.save();
        res.json({msg: 'succ'})
    } catch (err) {
        res.json({err: 'internal err'})
    }
})

export default app;