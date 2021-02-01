import { Router } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import knex from '../database/connection';
import authConfig from '../config/auth';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

    const { email, password } = request.body;

    const user = await knex('users').where('email', email).first();

    if(!user) {
        return response.status(400).json({
            message: "Invalid credentials! ❌"
        })
    }

    const comparePwd = await compare(password, user.password);

    if(!comparePwd) {
        return response.status(400).json({
            message: "Invalid credentials! ❌"
        })
    }

    const token = sign({},authConfig.jwt.secret, {
        subject: String(user.id),
        expiresIn: authConfig.jwt.expiresIn
    });

    const userAux = {
        id: user.id,
        name: user.name
    };

    return response.json({userAux, token});

});

export default sessionsRouter;

