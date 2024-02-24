import { PrismaClient, User } from '@prisma/client';
import { IUserModel } from '../interfaces/IUserModel';
import { IUserWithPosts } from '../interfaces/IUser';

export class UserModel implements IUserModel {
	constructor(private client = new PrismaClient()) {}

	create(newUser: Omit<User, 'id'>): Promise<User> {
		return this.client.user.create({ data: newUser });
	}

	findMany(): Promise<User[]> {
		return this.client.user.findMany();
	}

	findByEmail(email: string): Promise<IUserWithPosts | null> {
		return this.client.user.findFirst({
			where: { email },
			include: {
				posts: {
					select: { title: true, content: true, id: true }
				}
			}
		});
	}

	findById(id: number): Promise<IUserWithPosts | null> {
		return this.client.user.findUnique({
			where: { id },
			include: {
				posts: {
					select: { title: true, content: true, id: true }
				}
			}
		});
	}

	update(id: User['id'], user: Partial<Omit<User, 'id'>>): Promise<User | null> {
		return this.client.user.update({ where: { id }, data: user });
	}

	async delete(id: User['id']): Promise<void> {
		await this.client.user.delete({ where: { id } });
	}
}
