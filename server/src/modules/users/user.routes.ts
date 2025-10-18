import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

export default function userRoutes(server: FastifyInstance) {

    server.get("/", (request: FastifyRequest, reply: FastifyReply) => {
        return reply.code(200).send({ user: 123 });
    })

}