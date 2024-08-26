import { Router, Response, Request } from 'express';
const router = Router();
import { Types } from 'mongoose';
import { z } from 'zod';
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
import { CategoryColorDto, CategoryTitleDto, CategoryUserIdDto } from '../dtos/category';




const categorySchema = z.object({
    userId: z.string().optional(),
    title: z.string(),
    color: z.string()
});


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

router.post("/", [auth, upload.none(), validateWith(categorySchema)], async (req: Request, res: Response) => {
    const { userId } = req.user as CategoryUserIdDto;
    const { title } = req.body as CategoryTitleDto;
    const { color } = req.body as CategoryColorDto;

    const newCategory = new CategoryModel({
        userId: Types.ObjectId.createFromHexString(userId),
        title: title,
        color: color
    });

    const category = await CategoryModel.create(newCategory);
    res.status(201).send(category);
});




export default router;