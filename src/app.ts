import fastify from 'fastify';
import { atmController } from './controllers/atm';
import { userController } from './controllers/user';

const server = fastify();

/*==============================USER=========================================*/
server.get('/users', userController.list);
server.post('/users', userController.create);
server.get('/users/:userId', userController.find);

/*==============================ATM=========================================*/
server.post('/withdraw/:amount', atmController.create);

export default server;
