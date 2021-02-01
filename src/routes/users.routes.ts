import { Router } from 'express';
import knex from '../database/connection';
import { hash } from 'bcryptjs';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {

    const users = await knex('users').select('*');

    return response.json(users);
});

usersRouter.post('/', async (request, response) => {

    const { name, email, password } = request.body;

    const pwdHashed = await hash(password, 8);

    const user = { 
        name, 
        email, 
        password: pwdHashed
     };

    const newIds = await knex('users').insert(user);

    return response.json({

        id: newIds[0],
        ... user
    });

});

export default usersRouter;

