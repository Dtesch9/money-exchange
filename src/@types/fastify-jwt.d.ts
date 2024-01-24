import '@fastify/jwt';

declare module '@fastify/jwt' {
	interface FastifyJWT {
		/** payload type is used for signing and verifying */
		payload: { id: string };

		/** user type is return type of `request.user` object */
		user: {
			id: string;
		};
	}
}
