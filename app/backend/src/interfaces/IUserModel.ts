import { User } from '@prisma/client';

export interface IUserModel {
  create(user: Omit<User, 'id'>): Promise<User>;
  findMany(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  update(id: number, user: Omit<User, 'id'>): Promise<User | null>;
  delete(id: number): Promise<void>;
}
