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
    uId: {
        type: String,
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
        type: Schema.Types.Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Not started', 'In-progress', 'Complete'],
        required: true
    }
});






export default model<Task>('Task', TaskSchema);

