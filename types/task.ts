import { Document } from 'mongoose';
import { Category } from './category';

export interface Task extends Document {
    userId: string
    title: string
    categoryId: string
    description: string
    deadline: number
    priority: number
    executionTime: number
    startDate: number
    status: "Not started" | "In-progress" | "Complete"
}