import { model, Schema } from 'mongoose';
import { User } from "../types/user";


const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: false
    }
});






export default model<User>('User', UserSchema);

