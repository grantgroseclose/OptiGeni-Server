import { model, Schema } from 'mongoose';
import { Task } from "../types/task";


const TaskSchema: Schema = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.ObjectId,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    deadline: {
        type: Number,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    executionTime: {
        type: Number,
        required: true
    },
    startDate: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: false
    }
});






export default model<Task>('Task', TaskSchema);

