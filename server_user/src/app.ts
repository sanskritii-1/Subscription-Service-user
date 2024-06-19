import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import connectDB from './config/dbConfig';
import authenticationRoute from './routes/authentication';
import paymentHistoryRoutes from './routes/paymentHistoryRoutes';
import resourceRoute from './routes/resources';
import planRoute from './routes/plans'
import { authMiddleware } from './middleware/auth';

// Create an Express application
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authenticationRoute);
app.use('/api', paymentHistoryRoutes); // Include payment history routes
app.use('/api', resourceRoute);
app.use('/api', planRoute);

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});

app.get('/protected', authMiddleware, (req: Request, res: Response) => {
  res.send('Hello, from protected route');
});

import User from './models/user';
import UserResource from './models/userResources';
import PaymentHistory from './models/PaymentHistory';
app.post('/savePayment', async (req: Request, res: Response) => {
    const { email, price, description } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create user resource entry
        const userResource = new PaymentHistory({
            userId: user._id,
            amount: price, // Example value for leftResources
            description: description
        });

        // Save user resource
        await userResource.save();

        return res.status(200).json({ message: 'User resources saved successfully' });
    } catch (error) {
        console.error('Error saving user resources:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

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

// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const sharp = require('sharp');
// const axios = require('axios');
// const { v4: uuidv4 } = require('uuid');
// import { images } from './data/images';
// import "dotenv/config"

// // Configure S3 Client
// const s3 = new S3Client({
//   region: 'eu-north-1',
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   },
// });

// // Array of JSON objects with image URLs
// // const imagesArray = images;

// const image = {
//     "url": "https://facts.net/wp-content/uploads/2024/01/11-wildflower-facts-1705577874.jpg",
// }

// async function processImages() {
//     // for (const image of imagesArray) {
//       try {
//         // Fetch the image
//         const response = await axios.get(image.url, { responseType: 'arraybuffer' });
//         const buffer = Buffer.from(response.data, 'binary');
  
//         // Blur the image using sharp
//         const blurredImage = await sharp(buffer).blur(30).toBuffer();
  
//         // Upload blurred image to S3
//         const uploadParams = {
//           Bucket: 'subscription.blurred.images',
//           Key: `${uuidv4()}_blurred.jpg`,
//           Body: blurredImage,
//           ContentType: 'image/jpeg',
//         };
  
//         const uploadResult = await s3.send(new PutObjectCommand(uploadParams));
//         console.log(`Blurred image uploaded: https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`);

//       } catch (error) {
//         console.error(`Error processing image ${image.url}: `, error);
//       }
//     }
// //   }
  
//   processImages();

export default app;
