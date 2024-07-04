import { Request, Response, NextFunction } from "express";
import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Ensure logs directory exists
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Configure Winston logger with DailyRotateFile
const transport: DailyRotateFile = new DailyRotateFile({
    filename: path.join(logDir, 'application-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const logger = winston.createLogger({
    transports: [
        transport
    ]
});

// Middleware for error handling
export interface CustomError extends Error {
    status?: number;
}

export const ErrorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    console.log(err.stack);
    const status = err.status || 500;
    const msg = err.message || "Internal Server Error";
    res.status(status).json({ code: err.status, message: msg });
};
