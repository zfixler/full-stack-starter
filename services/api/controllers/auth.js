import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

export const authController = {
	async registerUser({ firstName, lastName, email, password }) {
		const response = {};

		if (!(firstName && lastName && email && password)) {
			response.err = {
				message: 'All fields are required.',
				code: 409,
			};
			return response;
		}

		const currentUser = await User.findOne({
			where: {
				email: email.toLowerCase(),
			},
		});

		if (currentUser) {
			response.err = {
				message: 'That email address is already in use.',
				code: 409,
			};
			return response;
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			firstName,
			lastName,
			email: email.toLowerCase(),
			password: encryptedPassword,
		});

		await newUser.save();

		response.user = newUser;
		return response;
	},
	async loginUser({ email, password }) {
		const response = {};

		if (!(email && password)) {
			response.err = {
				message: 'Email and password are required.',
				code: 409,
			};
			return response;
		}

		const currentUser = await User.findOne({
			where: {
				email: email.toLowerCase(),
			},
		});

		if (!currentUser) {
			response.err = {
				message: 'There is no user registered with that email address.',
				code: 400,
			};
			return response;
		}

		if (await bcrypt.compare(password, currentUser.password)) {
			await currentUser.save();

			response.user = currentUser;
			return response;
		}

		response.err = {
			message: 'Incorrect password.',
			code: 400,
		};
		return response;
	},
};
