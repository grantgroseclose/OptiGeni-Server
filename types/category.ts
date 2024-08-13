import { Document, Types } from 'mongoose';

export interface Category extends Document {
    userId: Types.ObjectId;
    title: string;
    color: string;
}