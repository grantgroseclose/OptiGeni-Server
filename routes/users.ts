import { Router, Response, Request } from 'express';
const router = Router();
import Joi from 'joi';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import validateWith from '../middleware/validation';

import { User } from '../types/user';
import UserModel from '../models/Users';
import { UserUsernameDto, UserPasswordDto , UserFirstnameDto } from '../dtos/register-user';





const validationSchema = Joi.object({
    username: Joi.string().required().min(5).max(18),
    password: Joi.string().required().min(5).max(18),
    firstname: Joi.string().required().min(5).max(18)
});


router.post("/", validateWith(validationSchema), async (req: Request, res: Response) => {
    const { username } = req.body as UserUsernameDto;
    const { password } = req.body as UserPasswordDto;
    const { firstname } = req.body as UserFirstnameDto;

    const usernameTaken = await UserModel.exists({ username: username });

    if (usernameTaken) {
        return res.status(400).send({ error: "Username already taken." });
    } else {
        const hashed_pass = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            hashed_pass,
            firstname
        });
        const user = await UserModel.create(newUser);
        res.status(201).send(user);
    }
});




export default router;
