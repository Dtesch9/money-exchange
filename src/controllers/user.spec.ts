import type { Prisma } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import { db } from '../../prisma/__mocks__/db';
import server from '../routes';

const User = { id: 'user-id', username: 'Douglas', password: 'super-password' };
const Authorization =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNscnNkaWE5MTAwMDBtcW04emlvZHU1YWciLCJpYXQiOjE3MDYxMzYzMTB9.FqteiQ4lfIDJDxlZsKNBGKPBiGnBpGfrQfoXvXUYw7Y';

vi.mock('../../prisma/db');

it('Should list all users', async () => {
	db.user.findMany.mockResolvedValue([User]);

	const response = await server.inject({
		method: 'GET',
		url: '/users',
		headers: { Authorization },
	});

	expect(JSON.parse(response.payload)).toStrictEqual({ user: [User] });
});

describe('Create User', () => {
	it('Should create a user', async () => {
		db.user.create.mockResolvedValue(User);
		const response = await server.inject({
			method: 'POST',
			url: '/users',
			body: {
				username: User.username,
				password: User.password,
			},
			headers: { Authorization },
		});

		expect(JSON.parse(response.payload)).toStrictEqual({ user: User });
	});

	it('Should not allow to create without passing body name', async () => {
		db.user.create.mockResolvedValue(User);
		const response = await server.inject({
			method: 'POST',
			url: '/users',
			headers: { Authorization },
		});

		expect(response.statusCode).toBe(400);
		expect(response.statusMessage).toMatchInlineSnapshot(`"Bad Request"`);
		expect(response.payload).toBe('username is missing');
	});
});

describe('Find User', () => {
	it('Should get user by userId', async () => {
		const user = {
			id: 'user-id',
			username: 'douglas',
			password: 'super-password',
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			account: { id: 'account-id', balance: '1000' as any, userId: 'user-id' },
		} as Prisma.UserGetPayload<{ include: { account: true } }>;

		db.user.findUnique.mockResolvedValue(user);

		const response = await server.inject({
			method: 'GET',
			url: '/users/oi',
			headers: { Authorization },
		});

		expect(response.statusCode).toBe(200);
		expect(response.statusMessage).toMatchInlineSnapshot(`"OK"`);
		expect(JSON.parse(response.payload)).toStrictEqual({ user });
	});
});
