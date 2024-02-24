import { z } from 'zod';

export const creationUserSchema = z.object({
	name: z.string().min(3).max(191),
	email: z.string().email(),
	password: z.string().min(8).max(191),
});

export const updateUserSchema = z.object({
	name: z.string().min(3).max(191).optional(),
	email: z.string().email().optional(),
	password: z.string().min(8).max(191).optional(),
	id: z.never().optional(),
});

export const loginUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(191),
});
