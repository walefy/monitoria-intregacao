import { User } from '@prisma/client';

export type UserWithoutPass = Omit<User, 'password'>;
