import "dotenv/config";

export const config = {
    PORT: parseInt(process.env.PORT || "5000"),
    CONN_STR: process.env.MONGO_URL || "mongodb://localhost:27017/subscription",
    DB_NAME: process.env.DBNAME || "subscription",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
}