import fastify from 'fastify';
import { ATMController } from './controllers/atm';
import { AuthController } from './controllers/authenticate';
import { UserController } from './controllers/user';

const server = fastify();

/*==============================AUTH=========================================*/
server.post('/authenticate/register', AuthController.register);

/*==============================USER=========================================*/
server.get('/users', UserController.list);
server.post('/users', UserController.create);
server.get('/users/:userId', UserController.find);

/*==============================ATM=========================================*/
server.post('/withdraw/:amount', ATMController.create);

export default server;
