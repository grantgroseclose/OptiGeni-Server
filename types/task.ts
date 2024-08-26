import { Document, Types } from 'mongoose';

export interface Task extends Document {
    // _id: Types.ObjectId;
    userId: Types.ObjectId;
    categoryId: Types.ObjectId;
    categoryTitle: string;
    title: string;
    description: string;
    deadline: number;
    priority: number;
    executionTime: number;
    status: string;
    startDate: number;
};