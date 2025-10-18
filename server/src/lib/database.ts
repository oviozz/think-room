import mongoose from 'mongoose';
import { env } from '../config/env.ts';
import { logger } from './logger.ts';

let mongooseClient: mongoose.Mongoose | undefined = undefined;

export const connectDB = async () => {
    if (mongooseClient && mongooseClient.connection.readyState === 1) return mongooseClient;

    try {
        mongooseClient = await mongoose.connect(env.DB_URL);
        return mongooseClient;
    } catch (error) {
        logger.error(error, 'Error connecting db');
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    try {
        if (mongooseClient && mongooseClient.connection.readyState === 1) {
            logger.info('Db connection is being closed');
            await mongooseClient.connection.close();
            mongooseClient = undefined;
            return;
        }

        logger.info('No active db connection to close');
    } catch (error) {
        logger.error(error, 'Error disconnecting db');
        process.exit(1);
    }
};
