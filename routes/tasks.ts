import { Router, Response, Request } from 'express';
const router = Router();
import { Document, HydratedDocument, HydratedDocumentFromSchema, Types } from 'mongoose';
import { z } from 'zod';
import multer from 'multer';
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 52428800 }
});
import moment from 'moment';
import validateWith from '../middleware/validation';
import auth from '../middleware/auth';

import { Task } from '../types/task';
import TaskModel from '../models/Tasks';
import CategoryModel from '../models/Categories';
import { TaskTitleDto, TaskDeadlineDto, TaskUserIdDto, TaskCategoryTitleDto, TaskDescriptionDto, TaskUIdDto } from '../dtos/task';
import { Category } from '../types/category';




const taskSchema = z.object({
    uId: z.string().min(1),
    title: z.string().min(2, 'Title must have at least 2 characters'),
    deadline: z.coerce.date(),
    categoryId: z.string().optional(),
    categoryTitle: z.string(),
    description: z.string(),
    status: z.enum(['Not started', 'In-progress', 'Complete']).optional()
});




router.get("/", auth, async (req: Request, res: Response) => {
    const { userId } = req.user as TaskUserIdDto;

    try {
        let tasks: Task[] = await TaskModel.find({});
        const filteredTasks = tasks.filter(task => task.userId.equals(userId));

        res.send(filteredTasks);
    } catch (error) {
        res.status(500).json({ error: "An unexpected error has occured fetching tasks."});
    }
});

router.post("/", [auth, upload.none(), validateWith(taskSchema)], async (req: Request, res: Response) => {
    const { userId } = req.user as TaskUserIdDto;
    const { uId } = req.body as TaskUIdDto;
    const { title } = req.body as TaskTitleDto;
    const { deadline } = req.body as TaskDeadlineDto;
    const { categoryTitle } = req.body as TaskCategoryTitleDto;
    const { description } = req.body as TaskDescriptionDto;

    const cat: HydratedDocument<Category> = await CategoryModel.findOne({ title: categoryTitle }) as HydratedDocument<Category>;

    if (!cat) {
        return res.status(404).send({ error: "Category not found" });
    }

    const newTask = new TaskModel({
        userId: Types.ObjectId.createFromHexString(userId),
        uId: uId,
        categoryId: cat._id as Types.ObjectId,
        categoryTitle: cat.title,
        title: title,
        description: description,
        deadline: deadline,
        status: 'Not started'
    });

    const task = await TaskModel.create(newTask);
    res.status(201).send(task);
});

router.delete("/delete", async (req, res) => {
    try {
        const { uId } = req.query;
        const task = await TaskModel.findOneAndDelete({ uId: uId });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});




export default router;

