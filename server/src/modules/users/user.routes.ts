import type { FastifyInstance } from 'fastify';
import { userControllers } from './user.controllers.ts';

export default function userRoutes(server: FastifyInstance) {
    server.get('/', userControllers.getUser);
}
