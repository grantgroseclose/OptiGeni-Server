import { model, Schema } from 'mongoose';
import { Task } from "../types/task";


const TaskSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    categoryTitle: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
    status: {
        type: String,
        enum: ['Not started', 'In-progress', 'Complete'],
        required: true
    },
    startDate: {
        type: Number,
        required: false
    }
});






export default model<Task>('Task', TaskSchema);

