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
import { TaskUserIdDto, TaskUIdDto, TaskStatusDto } from '../dtos/task';




const taskSchema = z.object({
    uId: z.string().min(1),
    title: z.string().min(2, 'Title must have at least 2 characters'),
    deadline: z.coerce.date(),
    priority: z.coerce.number().min(1, 'Priority must be greater than 0'),
    executionTime: z.coerce.number().min(1, 'Execution must be greater than 0'),
    categoryId: z.string(),
    categoryTitle: z.string(),
    description: z.string(),
    status: z.enum(['Not started', 'In-progress', 'Complete'])
});


router.get("/", auth, async (req: Request, res: Response) => {
    const { uId } = req.body as TaskUIdDto;

    const task: Task | null = await TaskModel.findOne({
        uId: uId
    });

    if (!task) {
        return res.status(404).json({ error: "Task not found..."});
    }

    res.send(task);
});

router.post("/", [validateWith(taskSchema), auth], async (req: Request, res: Response) => {
    const { userId } = req.user as TaskUserIdDto;
    const { uId } = req.body as TaskUIdDto;
    const { status } = req.body as TaskStatusDto;

    const updatedTask = await TaskModel.findOneAndUpdate({
        userId: userId,
        uId: uId
    }, {
        status: status
    }, {
        new: true
    });

    res.status(201).send(updatedTask);
});





export default router;