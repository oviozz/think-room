import type { FastifyReply, FastifyRequest } from 'fastify';
import { loginSchema } from './auth.schemas.ts';
import { z } from 'zod';

class AuthControllers {
    async login(
        request: FastifyRequest<{
            Body: z.infer<typeof loginSchema>;
        }>,
        reply: FastifyReply,
    ) {
        const { body } = request;

        return reply.send(body);
    }

    // async signup(request: FastifyRequest, reply: FastifyReply) {}
}

export const authControllers = new AuthControllers();
