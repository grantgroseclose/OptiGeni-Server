import { Router, Response, Request } from 'express';
const router = Router();
import { Types } from 'mongoose';
import Joi from 'joi';
import multer from 'multer';
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 52428800 }
});
import moment from 'moment';
import validateWith from '../middleware/validation';
import auth from '../middleware/auth';

import { Category } from '../types/category';
import CategoryModel from '../models/Categories';
import { TaskUserIdDto } from '../dtos/task';




router.get("/", auth, async (req: Request, res: Response) => {
    const { userId } = req.user as TaskUserIdDto;

    try {
        let categories: Category[] = await CategoryModel.find({});
        const filteredCategories = categories.filter(cat => cat.userId.equals(userId));

        res.send(filteredCategories);
    } catch (error) {
        res.status(500).json({ error: "An unexpected error has occured fetching categories."});
    }
});




export default router;