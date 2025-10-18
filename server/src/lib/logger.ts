import { env } from '../config/env.ts';
import pino from 'pino';

const isDev = env.NODE_ENV !== 'production';

// trace → debug → info → warn → error → fatal
//   10     20      30     40     50      60

export const loggerConfig = {
    level: isDev ? 'debug' : 'info',
    ...(isDev && {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
            },
        },
    }),
};

export const logger = pino(loggerConfig);
