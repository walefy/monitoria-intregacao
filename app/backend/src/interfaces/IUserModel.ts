import { User } from '@prisma/client';
import { IUserWithPosts } from './IUser';

export interface IUserModel {
  create(user: Omit<User, 'id'>): Promise<User>;
  findMany(): Promise<User[]>;
  findByEmail(email: string): Promise<IUserWithPosts | null>;
  findById(id: number): Promise<IUserWithPosts | null>;
  update(id: number, user: Omit<User, 'id'>): Promise<User | null>;
  delete(id: number): Promise<void>;
}
