import { model, Schema } from 'mongoose';
import { Category } from "../types/category";


const CategorySchema: Schema = new Schema({
    uId: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
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

