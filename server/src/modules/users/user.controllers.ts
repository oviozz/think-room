import type { FastifyReply, FastifyRequest } from 'fastify';

class UserControllers {
    getUser = (request: FastifyRequest, reply: FastifyReply) => {
        return reply.code(200).send({ user: 123 });
    };
}

export const userControllers = new UserControllers();
