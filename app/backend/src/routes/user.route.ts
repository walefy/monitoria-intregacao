import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/UserController';

export const userRouter = Router();
const userController = new UserController();

userRouter.post('/', (req: Request, res: Response) => userController.create(req, res));
