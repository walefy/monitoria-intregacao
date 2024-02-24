import { User } from '@prisma/client';
import { UserModel } from '../models/UserModel';
import { validateSchema } from '../utils/schemaValidator';
import { creationUserSchema, loginUserSchema, updateUserSchema } from '../schemas/user.schema';
import { IServiceResponse, ResponseWithToken } from '../interfaces/IServiceResponse';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import { TokenAuth } from '../entities/AuthToken';
import { Password } from '../entities/Password';
import { UserWithoutPass } from '../interfaces/IUser';

export class UserService {
	constructor(
		private userModel = new UserModel(),
		private tokenAuth = new TokenAuth(),
		private passwordHash = new Password()
	) {}

	async create(data: Omit<User, 'id'>): Promise<IServiceResponse<ResponseWithToken>> {
		const validate = validateSchema(creationUserSchema, data);

		if (!validate.valid) {
			return {
				status: HttpStatusCode.UNAUTHORIZED,
				data: { message: validate.error || '' }
			};
		}

		const userExists = await this.userModel.findByEmail(data.email);

		if (userExists) {
			return {
				status: HttpStatusCode.UNAUTHORIZED,
				data: { message: 'User already exists' }
			};
		}

		const user = await this.userModel.create({ ...data, password: this.passwordHash.hashSync(data.password) });
		const { password, ...userWithoutPass } = user;

		return { status: HttpStatusCode.CREATED, data: {
			token: this.tokenAuth.sign(userWithoutPass),
		} };
	}

	async login(data: Pick<User, 'email' | 'password'>): Promise<IServiceResponse<ResponseWithToken>> {
		const validate = validateSchema(loginUserSchema, data);

		if (!validate.valid) {
			return {
				status: HttpStatusCode.UNAUTHORIZED,
				data: { message: validate.error || '' }
			};
		}

		const user = await this.userModel.findByEmail(data.email);

		if (!user) {
			return {
				status: HttpStatusCode.UNAUTHORIZED,
				data: { message: 'User not found' }
			};
		}

		const passwordMatch = this.passwordHash.compareSync(data.password, user.password);

		if (!passwordMatch) {
			return {
				status: HttpStatusCode.UNAUTHORIZED,
				data: { message: 'Invalid password' }
			};
		}

		const { password, posts, ...userWithoutPass } = user;

		return { status: HttpStatusCode.OK, data: {
			token: this.tokenAuth.sign(userWithoutPass),
		} };
	}

	async findById(id: number): Promise<IServiceResponse<UserWithoutPass>> {
		const user = await this.userModel.findById(id);

		if (!user) {
			return {
				status: HttpStatusCode.NOT_FOUND,
				data: { message: 'User not found' }
			};
		}

		const { password, ...userWithoutPass } = user;

		return { status: HttpStatusCode.OK, data: userWithoutPass };
	}

	async update(id: number, data: Partial<Omit<User, 'id'>>): Promise<IServiceResponse<UserWithoutPass>> {
		console.log(data);
		
		const validate = validateSchema(updateUserSchema, data);

		if (!validate.valid) {
			return {
				status: HttpStatusCode.UNAUTHORIZED,
				data: { message: validate.error || '' }
			};
		}

		const user = await this.userModel.findById(id);

		if (!user) {
			return {
				status: HttpStatusCode.NOT_FOUND,
				data: { message: 'User not found' }
			};
		}

		if (data.email && data.email !== user.email) {
			const userExists = await this.userModel.findByEmail(data.email);

			if (userExists) {
				return {
					status: HttpStatusCode.UNAUTHORIZED,
					data: { message: 'Email already used' }
				};
			}
		}

		if (data.password) data.password = this.passwordHash.hashSync(data.password);
		const updatedUser = await this.userModel.update(id, data);

		if (!updatedUser) {
			return {
				status: HttpStatusCode.INTERNAL_SERVER_ERROR,
				data: { message: 'Error updating user' }
			};
		}

		const { password, ...userWithoutPass } = updatedUser;
		return { status: HttpStatusCode.OK, data: userWithoutPass };
	}
}
