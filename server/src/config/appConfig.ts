// loading env variables
import "dotenv/config";

export const config = {
    PORT: parseInt(process.env.PORT || "7001"),
    CONN_STR: process.env.MONGO_URL || "mongodb+srv://naman:naman@cluster0.lu8git5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    DB_NAME: process.env.DBNAME || "test",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET||"hiii",
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    MAILJET_API_KEY :"d380c61ae288e7552fedc2d90775a385",
    MAILJET_SECRET_KEY :"acb8eeabca4e4d889744679dcb4b54d1"
}