import fastify from 'fastify';
import { userController } from './controllers/user';
import { atmController } from './controllers/atm';

const server = fastify();

/*==============================USER=========================================*/
server.get('/users', userController.list);
server.post('/users', userController.create);
server.get('/users/:userId', userController.find);

/*==============================ATM=========================================*/
server.post('/withdraw/:amount', atmController.create);

export default server;
