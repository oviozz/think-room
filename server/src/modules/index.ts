import type {FastifyInstance} from "fastify";
import userRoutes from "./users/user.routes.ts";

export default async function mainRoutes(server: FastifyInstance) {

    await server.register(userRoutes, { prefix: "/user" });

}