import { Document, Types } from 'mongoose';

export interface Task extends Document {
    userId: Types.ObjectId;
    categoryId: Types.ObjectId;
    title: string;
    description: string;
    deadline: number;
    priority: number;
    executionTime: number;
    status: string;
    startDate: number;
};