const tasks = [
    
];

const addTask = (task) => {
    task.id = tasks.length + 1;
    tasks.push(task);
};

const getTasks = () => tasks;

const getTask = (id) => tasks.find((task) => task.id === id);

const filterTasks = (predicate) => tasks.filter(predicate);

module.exports = {
    addTask,
    getTasks,
    getTask,
    filterTasks
};
