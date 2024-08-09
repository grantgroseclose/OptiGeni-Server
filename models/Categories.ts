import { model, Schema } from 'mongoose';
import { Category } from "../types/category";


const CategorySchema: Schema = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});






export default model<Category>('Category', CategorySchema);

