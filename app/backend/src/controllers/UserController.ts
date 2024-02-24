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

	async findById(req: Request, res: Response) {
		const { id } = req.params;
		const response = await this.userService.findById(+id);

		return res.status(response.status).json(response.data);
	}

	async update(req: Request, res: Response) {
		const { id } = req.params;
		const response = await this.userService.update(+id, req.body);

		return res.status(response.status).json(response.data);
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		const response = await this.userService.delete(+id);

		return res.status(response.status).json(response.data);
	}
}
