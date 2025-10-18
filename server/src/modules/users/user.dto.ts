import { z } from 'zod';
import { baseUserSchema, UserType } from './user.schemas.js';

const UserPublicDtoSchema = baseUserSchema.omit({
    _id: true,
    password: true,
});

export type UserPublicDTO = z.infer<typeof UserPublicDtoSchema>;

export function toPublicUserDTO(user: UserType) {
    return UserPublicDtoSchema.parse(user);
}
