import { NextFunction, Request, Response } from 'express';
import { TokenAuth } from '../entities/AuthToken';
import { UserModel } from '../models/UserModel';

const userModel = new UserModel();

export const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;
	const token = authorization?.split(' ')[1];

	if (!token) return res.status(401).json({ message: 'Token not found' });

	const tokenAuth = new TokenAuth();

	if (!tokenAuth.verify(token)) {
		return res.status(401).json({ message: 'Invalid token' });
	}

	const decoded = tokenAuth.decrypt(token);
  
	if (!decoded) return res.status(401).json({ message: 'Invalid token' });

	const user = await userModel.findById(decoded.id);

	if (!user) return res.status(401).json({ message: 'Invalid token' });
  
	next();
};
