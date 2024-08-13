import express from 'express';
import dotenv from 'dotenv';

import connectDB from './connectDB';
import tasks from './routes/tasks';
import users from './routes/users';
import user from './routes/user';
import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload;
        }
    }
}

dotenv.config({ path: require('find-config')('.env') });


const app = express();
connectDB();
app.use(express.json());

app.use("/api/tasks", tasks);
app.use("/api/auth/register", users);
app.use("/api/auth/login", user);

const port = process.env.PORT || 3000;


app.listen(port, function() {
    console.log(`Server started on port ${port}...`);
});