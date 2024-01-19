import type { RouteHandler } from 'fastify';
import { getExchangeNotes } from '../services/getExchangeNotes';

type Params = { Params: { userId: string; amount: number } };

// Test this with vitest
export const create: RouteHandler<Params> = (req, res) => {
	const amount = req.params?.amount;

	if (!amount) return res.status(400).send('amount is missing');

	return res.status(200).send(getExchangeNotes(Math.round(amount)));
};

export const atmController = { create };
