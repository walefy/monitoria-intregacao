import { Post } from '@prisma/client';

export interface IPostModel {
  create(post: Omit<Post, 'id'>): Promise<Post>;
  findMany(): Promise<Post[]>;
  findById(id: number): Promise<Post | null>;
  update(id: number, post: Omit<Post, 'id'>): Promise<Post | null>;
  delete(id: number): Promise<void>;
  findByAuthorId(authorId: number): Promise<Post[]>;
  searchPosts(search: string): Promise<Post[]>;
}
