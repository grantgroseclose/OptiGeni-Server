import { Router, Response, Request } from 'express';
const router = Router();
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import validateWith from '../middleware/validation';

import { User } from '../types/user';
import UserModel from '../models/Users';
import { UserUsernameDto, UserPasswordDto , UserFirstnameDto } from '../dtos/user';




const newUserSchema = z.object({
    username: z.string().min(5, 'Username must have at least 5 characters'),
    password: z.string().min(5, 'Password must have at least 5 characters'),
    firstname: z.string().min(1, 'First name must have at least 1 character')
});


router.post("/", validateWith(newUserSchema), async (req: Request, res: Response) => {
    const { username } = req.body as UserUsernameDto;
    const { password } = req.body as UserPasswordDto;
    const { firstname } = req.body as UserFirstnameDto;

    const usernameTaken = await UserModel.exists({ username: username });

    if (usernameTaken) {
        return res.status(400).send({ error: "Username already taken." });
    } else {
        const hashed_pass = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username: username,
            password: hashed_pass,
            firstname: firstname
        });
        const user = await UserModel.create(newUser);
        res.status(201).send(user.toObject());
    }
});




export default router;
