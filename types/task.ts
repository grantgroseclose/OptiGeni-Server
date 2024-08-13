import { Document, Types } from 'mongoose';

export interface Task extends Document {
    userId: Types.ObjectId
    title: string
    categoryId: Types.ObjectId
    description: string
    deadline: number
    priority: number
    executionTime: number
    startDate: number
    status: "Not started" | "In-progress" | "Complete"
}