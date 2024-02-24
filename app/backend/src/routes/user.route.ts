import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/UserController';

export const userRouter = Router();
const userController = new UserController();

userRouter.post('/', (req: Request, res: Response) => userController.create(req, res));
userRouter.post('/login', (req: Request, res: Response) => userController.login(req, res));
userRouter.get('/:id', (req: Request, res: Response) => userController.findById(req, res));
userRouter.put('/:id', (req: Request, res: Response) => userController.update(req, res));
