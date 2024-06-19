import { Document } from 'mongoose';

export interface Task extends Document {
    userId: string
    title: string
    category: string
    description: string
    deadline: number
    priority: number
    executionTime: number
    startTime: number
    status: string
}