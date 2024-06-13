const dotenv = require('dotenv');
const express = require("express");

dotenv.config({ path: require('find-config')('.env') });

const connectDB = require('./connectDB');
const tasks = require("./routes/tasks");


const app = express();
connectDB();
app.use(express.json());

app.use("/api/tasks", tasks);


const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server started on port ${port}...`);
});