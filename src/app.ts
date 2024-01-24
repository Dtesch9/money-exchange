import jwt from '@fastify/jwt';
import fastify from 'fastify';

const server = fastify();

server.register(jwt, {
	secret: 'supersecret',
});

server.addHook('onRequest', async (request, reply) => {
	try {
		if (!request.url.endsWith('register') || !request.url.endsWith('login')) {
			await request.jwtVerify();
		}
	} catch (err) {
		reply.send(err);
	}
});

export { server };
