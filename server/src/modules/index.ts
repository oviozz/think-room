import type { FastifyInstance } from 'fastify';
import userRoutes from './users/user.routes.ts';
import authRoutes from './auth/auth.routes.ts';

export default async function mainRoutes(server: FastifyInstance) {
    await server.register(userRoutes, { prefix: '/user' });
    await server.register(authRoutes, { prefix: '/auth' });
}
