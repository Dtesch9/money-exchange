import type { Prisma } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import { db } from '../../prisma/__mocks__/db';
import app from '../app';

vi.mock('../../prisma/db');

it('Should list all users', async () => {
	db.user.findMany.mockResolvedValue([{ id: '1', name: 'Douglas' }]);

	const response = await app.inject({
		method: 'GET',
		url: '/users',
	});

	expect(JSON.parse(response.payload)).toStrictEqual({ user: [{ id: '1', name: 'Douglas' }] });
});

describe('Create User', () => {
	it('Should create a user', async () => {
		db.user.create.mockResolvedValue({ id: 'douglas-id', name: 'Douglas' });
		const response = await app.inject({
			method: 'POST',
			url: '/users',
			body: {
				name: 'Douglas',
			},
		});

		expect(JSON.parse(response.payload)).toStrictEqual({ user: { id: 'douglas-id', name: 'Douglas' } });
	});

	it('Should not allow to create without passing body name', async () => {
		db.user.create.mockResolvedValue({ id: 'douglas-id', name: 'Douglas' });
		const response = await app.inject({
			method: 'POST',
			url: '/users',
		});

		expect(response.statusCode).toBe(400);
		expect(response.statusMessage).toMatchInlineSnapshot(`"Bad Request"`);
		expect(response.payload).toBe('name is missing');
	});
});

describe('Find User', () => {
	it('Should get user by userId', async () => {
		const user = {
			id: 'user-id',
			name: 'douglas',
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			account: { id: 'account-id', balance: '1000' as any, userId: 'user-id' },
		} as Prisma.UserGetPayload<{ include: { account: true } }>;

		db.user.findUnique.mockResolvedValue(user);

		const response = await app.inject({
			method: 'GET',
			url: '/users/oi',
		});

		expect(response.statusCode).toBe(200);
		expect(response.statusMessage).toMatchInlineSnapshot(`"OK"`);
		expect(JSON.parse(response.payload)).toStrictEqual({ user });
	});
});
