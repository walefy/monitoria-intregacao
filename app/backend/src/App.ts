import express from 'express';
import cors from 'cors';
import { mainRouter } from './routes/mainRouter';

export class App {
	public app: express.Express;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
	}

	private config(): void {
		this.app.use(express.json());
		this.app.use(cors({
			origin: '*',
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		}));
	}

	private routes(): void {
		this.app.use(mainRouter);
	}

	public start(port: number): void {
		this.app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	}
}
