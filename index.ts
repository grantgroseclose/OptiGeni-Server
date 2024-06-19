import express from 'express';
import dotenv from 'dotenv';

import connectDB from './connectDB';
import tasks from './routes/tasks';

dotenv.config({ path: require('find-config')('.env') });


const app = express();
connectDB();
app.use(express.json());

app.use("/api/tasks", tasks);

const port = process.env.PORT || 3000;


app.listen(port, function() {
    console.log(`Server started on port ${port}...`);
});