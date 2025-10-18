import Fastify from 'fastify';
import { env } from './config/env.ts';
import { connectDB } from './lib/database.ts';
import gracefulShutdown from './lib/graceful-shutdown.ts';
import { logger, loggerConfig } from './lib/logger.ts';
import mainRoutes from './modules/index.ts';
import {
    serializerCompiler,
    validatorCompiler,
    hasZodFastifySchemaValidationErrors,
} from 'fastify-type-provider-zod';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const server = Fastify({ logger: loggerConfig }).withTypeProvider<ZodTypeProvider>();

const buildServer = async () => {
    const port = Number(env.PORT) || 4000;

    try {
        await connectDB();
        server.setValidatorCompiler(validatorCompiler);
        server.setSerializerCompiler(serializerCompiler);

        server.setErrorHandler((error, _, reply) => {
            if (hasZodFastifySchemaValidationErrors(error)) {
                return reply.code(400).send({
                    success: false,
                    message: "Request doesn't match the schema",
                });
            }

            logger.error(error);
            return reply.code(500).send({
                success: false,
                message: error.message,
            });
        });

        await server.register(mainRoutes);
        await server.listen({ port });
        logger.info('Server is running');
    } catch (error) {
        logger.error(error, 'Error starting the server');
        process.exit(1);
    }
};

buildServer();

// ctrl + c, other process exit graceful shutdown
const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
signals.forEach((signal) => {
    process.on(signal, gracefulShutdown);
});
