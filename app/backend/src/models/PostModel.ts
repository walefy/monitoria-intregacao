import { Post, PrismaClient } from '@prisma/client';

export class PostModel {
	constructor(private client = new PrismaClient()) {}

	create(post: Omit<Post, 'id'>): Promise<Post> {
		return this.client.post.create({ data: post });
	}

	findMany(): Promise<Post[]> {
		return this.client.post.findMany();
	}

	findById(id: number): Promise<Post | null> {
		return this.client.post.findUnique({ where: { id }, include: { author: true } });
	}

	update(id: Post['id'], post: Omit<Post, 'id'>): Promise<Post | null> {
		return this.client.post.update({ where: { id }, data: post });
	}

	async delete(id: Post['id']): Promise<void> {
		await this.client.post.delete({ where: { id } });
	}

	findByAuthorId(authorId: number): Promise<Post[]> {
		return this.client.post.findMany({ where: { authorId } });
	}

	searchPosts(search: string): Promise<Post[]> {
		return this.client.post.findMany({
			where: {
				OR: [
					{ title: { contains: search } },
					{ content: { contains: search } },
					{ author: { name: { contains: search } } }
				]
			}
		});
	}
}
