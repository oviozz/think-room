import { z } from 'zod';

export const baseUserSchema = z.object({
    _id: z.string().optional(),
    username: z.string().min(5, 'Username needs to be longer').max(20, 'Username is too long'),
    email: z.email('Email is invalid').min(1, 'Email is required'),
    password: z.string().min(1, 'Password needs to be longer'),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type UserType = z.infer<typeof baseUserSchema>;
