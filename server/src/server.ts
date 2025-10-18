import Fastify from "fastify";
import {env} from "../config/env.ts";
import {connectDB} from "../lib/database.ts";
import gracefulShutdown from "../lib/graceful-shutdown.ts";
import {logger, loggerConfig} from "../lib/logger.ts";
import mainRoutes from "./modules/index.ts";

const server = Fastify({ logger: loggerConfig });

const buildServer = async () => {
    const port = Number(env.PORT) || 4000;

    try {
        await connectDB();
        // routes
        await server.register(mainRoutes);

        await server.listen({ port });
        logger.info("Server is running");
    } catch (error) {
        server.log.error(error, "Error starting the server");
        process.exit(1);
    }
}

buildServer();

// ctrl + c, other process exit graceful shutdown
const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
signals.forEach(signal => {
    process.on(signal, gracefulShutdown)
})