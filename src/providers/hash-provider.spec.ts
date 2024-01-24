import { expect, test } from 'vitest';
import { HashProvider } from './hash-provider';

test('Should return a hash for a given password', () => {
	const hash = HashProvider.generateHash('super-password');

	expect(hash).not.be.eq('super-password');
});

test('Should validate hash', () => {
	const hash = HashProvider.generateHash('super-password');

	expect(HashProvider.compareHash('super-password', hash)).toBeTruthy();
});
