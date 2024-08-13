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

import { Task } from '../types/task';
import TaskModel from '../models/Tasks';
import { TaskTitleDto, TaskDeadlineDto, TaskPriorityDto, TaskExTimeDto, TaskUserIdDto } from '../dtos/create-task';
import schedule from '../middleware/schedule';


const validationSchema = Joi.object({
    title: Joi.string().min(1).required(),
    deadline: Joi.number().min(1).required(),
    priority: Joi.number().min(1).required(),
    executionTime: Joi.number().min(1).required()
});




router.get("/", auth, async (req: Request, res: Response) => {
    const { userId } = req.user as TaskUserIdDto;

    try {
        let tasks: Task[] = await TaskModel.find({});
        const filteredTasks = tasks.filter(task => task.userId.equals(userId));
        
        tasks = schedule(filteredTasks);
        res.send(tasks);
    } catch (error) {
        res.status(500).json({ error: "An unexpected error has occured fetching tasks."});
    }
});

router.post("/", [auth, upload.none(), validateWith(validationSchema)], async (req: Request, res: Response) => {
    const { userId } = req.user as TaskUserIdDto;
    const { title } = req.body as TaskTitleDto;
    const { deadline } = req.body as TaskDeadlineDto;
    const { priority } = req.body as TaskPriorityDto;
    const { executionTime } = req.body as TaskExTimeDto;

    const newTask = new TaskModel({
        userId: Types.ObjectId.createFromHexString(userId),
        title: title,
        deadline: deadline,
        priority: priority,
        executionTime: executionTime
    });
    const task = await TaskModel.create(newTask);
    res.status(201).send(task);
});

router.delete("/delete", async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndDelete(req.query.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});




export default router;

