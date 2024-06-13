const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 52428800 }
});
const moment = require("moment");
const validateWith = require("../middleware/validation");

const TaskModel = require('../models/Tasks');
const schedule = require('../middleware/schedule');

const validationSchema = Joi.object({
    title: Joi.string().min(1).required(),
    deadline: Joi.number().min(1).required(),
    priority: Joi.number().min(1).required(),
    executionTime: Joi.number().min(1).required()
});




router.get("/", async (req, res) => {
    try {
        let tasks = await TaskModel.find({});
        tasks = schedule(tasks);
        res.send(tasks);
    } catch (error) {
        res.status(500).json({ error: "An unexpected error has occured fetching tasks."});
    }
});

router.post("/", [upload.none(), validateWith(validationSchema)], async (req, res) => {
    const newTask = new TaskModel({
        title: req.body.title,
        deadline: req.body.deadline,
        priority: req.body.priority,
        executionTime: req.body.executionTime
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




module.exports = router;

