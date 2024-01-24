import type { RouteHandler } from 'fastify';
import { db } from '../../prisma/db';
import { server } from '../app';
import { HashProvider } from '../providers/hash-provider';

type AuthenticateArgs = {
	username: string;
	password: string;
};

export const register: RouteHandler<{ Body: AuthenticateArgs }> = async (req, res) => {
	try {
		const username = req.body?.username;
		const password = req.body?.password;

		if (!username) return res.status(400).send('username is missing');
		if (!password) return res.status(400).send('password is missing');

		const hashedPassword = HashProvider.generateHash(password);

		const { id } = await db.user.create({ data: { username: 'Douglas', password: hashedPassword } });

		const accessToken = server.jwt.sign({ id });

		return res
			.code(200)
			.headers({
				'cache-control': 'max-age=3600000, must-revalidate',
				cookie: `accessToken=${accessToken}; max-age=3600000; Secure; HttpOnly`,
			})
			.send({ accessToken });
	} catch (error) {
		console.error('Error creating users', { error });

		return res.status(401);
	}
};

export const login: RouteHandler<{ Body: AuthenticateArgs }> = async (req, res) => {
	try {
		const username = req.body?.username;
		const password = req.body?.password;

		if (!username) return res.status(400).send('username is missing');
		if (!password) return res.status(400).send('password is missing');

		const user = await db.user.findUnique({ where: { username: 'Douglas' }, select: { id: true, password: true } });

		if (!HashProvider.compareHash(password, user?.password ?? '')) {
			return res.status(401).send('username or password does not match');
		}

		const accessToken = server.jwt.sign({ id: user?.id ?? '' });

		return res
			.code(200)
			.headers({
				'cache-control': 'max-age=3600000, must-revalidate',
				cookie: `accessToken=${accessToken}; max-age=3600000; Secure; HttpOnly`,
			})
			.send({ accessToken });
	} catch (error) {
		console.error('Error creating users', { error });

		return res.status(401);
	}
};

export const AuthController = { register, login };
