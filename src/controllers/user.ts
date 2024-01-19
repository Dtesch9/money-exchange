import type { RouteHandler } from 'fastify';
import { db } from '../../prisma/db.js';

export const list: RouteHandler = async (_req, res) => {
	try {
		const user = await db.user.findMany();

		return res.code(200).header('cache-control', 'max-age=604800, must-revalidate').send({ user });
	} catch (error) {
		console.error(error);
	}
};

export const create: RouteHandler<{ Body: { name: string } }> = async (req, res) => {
	try {
		const name = req.body?.name;

		if (!name) return res.status(400).send('name is missing');

		const user = await db.user.create({
			data: { name, account: { create: { balance: 100 } } },
			include: { account: true },
		});

		return res.code(200).header('cache-control', 'max-age=604800, must-revalidate').send({ user });
	} catch (error) {
		console.error('Error creating users', { error });

		return res.status(401);
	}
};

export const find: RouteHandler<{ Params: { userId: string } }> = async (req, res) => {
	const userId = req.params?.userId;

	if (!userId) return res.status(401).send('userId is missing');

	try {
		const user = await db.user.findUnique({
			where: { id: userId },
			include: { account: true },
		});

		return res.code(200).header('cache-control', 'max-age=604800, must-revalidate').send({ user });
	} catch (error) {
		console.error(`Error finding user by id: ${userId}`, { error });
	}
};

export const userController = { list, create, find };
