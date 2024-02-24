import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/UserController';
import { jwtAuth } from '../middlewares/jwtAuth';
import { isSameUser } from '../middlewares/isSameUser';

export const userRouter = Router();
const userController = new UserController();

userRouter.post('/', (req: Request, res: Response) => userController.create(req, res));
userRouter.post('/login', (req: Request, res: Response) => userController.login(req, res));
userRouter.get('/:id', (req: Request, res: Response) => userController.findById(req, res));
userRouter.put('/:id', jwtAuth, isSameUser, (req: Request, res: Response) => userController.update(req, res));
userRouter.delete('/:id', jwtAuth, isSameUser, (req: Request, res: Response) => userController.delete(req, res));
