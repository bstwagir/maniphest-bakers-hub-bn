import express from 'express';
import signupRouter from './signup.routes';
import fetchUsers from './getUsers.routes';
import login from './login.routes'


const routes = express();

routes.use('/api', signupRouter);
routes.use('/api', fetchUsers);
routes.use('/api', login);


export default routes;