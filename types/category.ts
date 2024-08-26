import { Document, Types } from 'mongoose';

export interface Category extends Document {
    userId: Types.ObjectId;
    uId: string;
    title: string;
    color: string;
}