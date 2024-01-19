import { RouteHandler } from 'fastify';
import { getExchangeNotes } from '../services/getExchangeNotes.js';

type Note = string;
type Params = { Params: { userId: string; amount: number } };

// Test this with vitest
export const create: RouteHandler<Params> = (req, res) => {
  const amount = req.params?.amount;

  if (!amount) return res.status(400).send('amount is missing');

  return res.status(200).send(getExchangeNotes(amount));
};

export const atmController = { create };
