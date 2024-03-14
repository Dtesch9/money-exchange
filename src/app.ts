import jwt from '@fastify/jwt';
import fastify from 'fastify';

const server = fastify();

server.register(jwt, {
	secret: 'supersecret',
});

const PublicRoutes = ['/authenticate/register', '/authenticate/login'];

server.addHook('onRequest', async (request, reply) => {
	try {
		if (PublicRoutes.includes(request.url)) return;

		await request.jwtVerify();
	} catch (err) {
		reply.send(err);
	}
});

export { server };
