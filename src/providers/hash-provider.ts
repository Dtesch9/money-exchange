import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

function generateHash(password: string) {
	return hashSync(password, genSaltSync(8));
}

function compareHash(password: string, hashedPassword: string) {
	return compareSync(password, hashedPassword);
}

export const HashProvider = { generateHash, compareHash };

export type HashProviderType = typeof HashProvider;
