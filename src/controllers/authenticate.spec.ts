import { describe, expect, it, vi } from 'vitest';
import { db } from '../../prisma/__mocks__/db';
import { db as actualDB } from '../../prisma/db';
import { HashProvider } from '../providers/hash-provider';
import server from '../routes';

const User = { id: 'user-id', username: 'douglas', password: 'super-password' };

vi.mock('../../prisma/db');

const generateHash = vi.spyOn(HashProvider, 'generateHash');

describe('User authentication', () => {
	it('Should user get registered', async () => {
		db.user.create.mockResolvedValue(User);

		const response = await server.inject({
			method: 'POST',
			url: '/authenticate/register',
			body: { username: User.username, password: User.password },
		});

		expect(generateHash).toHaveBeenCalledOnce();
		expect(generateHash).toHaveBeenCalledWith(User.password);

		expect(actualDB.user.create).toHaveBeenCalledOnce();

		expect(response.statusCode).toBe(200);
		expect(response.statusMessage).toMatchInlineSnapshot(`"OK"`);
		expect(JSON.parse(response.payload)).property('accessToken').and.not.null;
	});
});
