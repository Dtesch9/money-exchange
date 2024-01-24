import bc from 'bcryptjs';

function generateHash(password: string) {
	return bc.hashSync(password, bc.genSaltSync(8));
}

function compareHash(password: string, hashedPassword: string) {
	return bc.compareSync(password, hashedPassword);
}

export const HashProvider = { generateHash, compareHash };

export type HashProviderType = typeof HashProvider;
