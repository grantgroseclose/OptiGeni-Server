const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    userId: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    deadline: {
        type: Number,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    executionTime: {
        type: Number,
        required: true
    },
    startDate: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: false
    }
});






module.exports = mongoose.model('Task', TaskSchema);

