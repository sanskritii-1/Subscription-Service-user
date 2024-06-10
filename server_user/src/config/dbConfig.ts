import mongoose from "mongoose";
import { config } from "./appConfig";

// if (!process.env.MONGO_URL) {
//     throw new Error('MONGO_URL environment variable is not set.');
//   }
//   const conn_str: string = process.env.MONGO_URL;
  
// main().catch(err => console.log(err));
const connectDB = async () => {
    try{
        await mongoose.connect(config.CONN_STR, {dbName: config.DB_NAME});
        console.log("db connected");

    }
    catch(err){
        console.log(err);
    }
}

export default connectDB;