import { Task } from '../types/task';




const schedule = (tasks: Task[]) => {
    // tasks.sort((a, b) => (b.priority / b.deadline) - (a.priority / a.deadline));

    // const schedule: Task[] = [];
    // const infeasibleTasks: Task[] = [];
    // let currentTime = 0;

    // tasks.forEach(task => {
    //     if (currentTime + task.executionTime <= task.deadline) {
    //         task.startDate = currentTime;
    //         schedule.push(task);
    //         currentTime += task.executionTime;
    //     } else {
    //         infeasibleTasks.push(task);
    //     }
    // });

    // // Binary search to find insertion point
    // const binarySearch = (startTime: number) => {
    //     let low = 0;
    //     let high = schedule.length - 1;
    //     while (low <= high) {
    //         const mid = Math.floor((low + high) / 2);
    //         if (schedule[mid].startDate < startTime) {
    //             low = mid + 1;
    //         } else if (schedule[mid].startDate > startTime) {
    //             high = mid - 1;
    //         } else {
    //             return mid; // Found exact match
    //         }
    //     }
    //     return low; // Point of insertion
    // }

    // infeasibleTasks.forEach(task => {
    //     let minimumFeasibleTime = task.deadline - task.executionTime;
    //     let insertionIndex = binarySearch(minimumFeasibleTime);
    //     task.startDate = minimumFeasibleTime;
    //     schedule.splice(insertionIndex, 0, task);
    // });

    // return schedule;

    return tasks;
};




export default schedule;
