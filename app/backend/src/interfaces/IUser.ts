import { Post, User } from '@prisma/client';

export type UserWithoutPass = Omit<User, 'password'>;
export interface IUserWithPosts extends User {
	posts: Pick<Post, 'title' | 'content' | 'id'>[];
}
