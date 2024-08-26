import { Router, Response, Request } from 'express';
const router = Router();
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import validateWith from '../middleware/validation';

import { User } from '../types/user';
import UserModel from '../models/Users';
import { UserUsernameDto, UserPasswordDto , UserFirstnameDto } from '../dtos/user';




const existingUserSchema = z.object({
    username: z.string().min(5, 'Username must have at least 5 characters'),
    password: z.string().min(5, 'Password must have at least 5 characters')
});


router.post("/", validateWith(existingUserSchema), async (req: Request, res: Response) => {
    const { username } = req.body as UserUsernameDto;
    const { password } = req.body as UserPasswordDto;

    const user = await UserModel.findOne({ username: username });
    if (!user) {
        return res.status(400).send({ error: "User does not exist." });
    }

    const comp = await bcrypt.compare(password, user.password);
    if (!comp) {
        return res.status(400).send({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
      {
          username: user.username,
          userId: user._id
      },
      "jwtPrivateKey",
      { expiresIn: "24h" }
    );

    res.send(token);
});




export default router;
