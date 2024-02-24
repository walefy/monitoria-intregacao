import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
	constructor(private userService = new UserService()) {}

	async create(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const response = await this.userService.create({ name, email, password });

		return res.status(response.status).json(response.data);
	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body;
		const response = await this.userService.login({ email, password });

		return res.status(response.status).json(response.data);
	}
}
