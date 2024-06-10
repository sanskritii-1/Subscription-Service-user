import "dotenv/config";

export const config = {
    PORT: parseInt(process.env.PORT || "5000"),
    CONN_STR: process.env.MONGO_URL || "mongodb://localhost:27017/subscription",
    DB_NAME: process.env.DBNAME || "subscription",
}