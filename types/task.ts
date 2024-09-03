import { Date, Document, Types } from 'mongoose';

export interface Task extends Document {
    userId: Types.ObjectId;
    categoryId: Types.ObjectId;
    uId: string;
    categoryTitle: string;
    title: string;
    description: string;
    deadline: Date;
    status: string;
};