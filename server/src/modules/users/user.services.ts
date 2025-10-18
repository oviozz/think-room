import type { UserType } from './user.schemas.js';
import { User } from './user.model.js';
import { toPublicUserDTO, UserPublicDTO } from './user.dto.js';

class UserServices {
    async getUser(query: Record<keyof UserType, string>): Promise<UserPublicDTO | null> {
        const user = await User.findOne(query).lean();

        if (!user) {
            return null;
        }

        return toPublicUserDTO(user as unknown as UserType);
    }
}

export const userServices = new UserServices();
