import { baseUserSchema } from '../users/user.schemas.ts';

export const loginSchema = baseUserSchema.pick({
    email: true,
    password: true,
});
