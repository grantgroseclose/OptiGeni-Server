import { Document } from 'mongoose';

export interface Category extends Document {
    userId: string;
    title: string;
    color: string;
}