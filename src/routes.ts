import { server } from './app';
import { ATMController } from './controllers/atm';
import { AuthController } from './controllers/authenticate';
import { UserController } from './controllers/user';

/*==============================AUTH=========================================*/
server.post('/authenticate/register', AuthController.register);
server.post('/authenticate/login', AuthController.login);

/*==============================USER=========================================*/
server.get('/users', UserController.list);
server.post('/users', UserController.create);
server.get('/users/:userId', UserController.find);

/*==============================ATM=========================================*/
server.post('/withdraw/:amount', ATMController.create);

export default server;
