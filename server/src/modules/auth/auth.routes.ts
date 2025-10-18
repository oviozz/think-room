import type { FastifyInstance } from 'fastify';
import { authControllers } from './auth.controllers.ts';
import { loginSchema } from './auth.schemas.ts';

export default function authRoutes(server: FastifyInstance) {
    server.post(
        '/login',
        {
            schema: {
                body: loginSchema,
            },
        },
        authControllers.login,
    );

    // server.post('/signup', authControllers.signup);
}
