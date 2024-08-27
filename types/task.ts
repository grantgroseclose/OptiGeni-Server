import { Date, Document, Types } from 'mongoose';

export interface Task extends Document {
    userId: Types.ObjectId;
    categoryId: Types.ObjectId;
    uId: string;
    categoryTitle: string;
    title: string;
    description: string;
    deadline: Date;
    priority: number;
    executionTime: number;
    status: string;
    startDate: number;
};