const schedule = (tasks) => {
    tasks.sort((a, b) => (b.priority / b.deadline) - (a.priority / a.deadline));

    const schedule = [];
    const infeasibleTasks = [];
    let currentTime = 0;

    tasks.forEach(task => {
        if (currentTime + task.executionTime <= task.deadline) {
            task.startTime = currentTime;
            schedule.push(task);
            currentTime += task.executionTime;
        } else {
            infeasibleTasks.push(task);
        }
    });

    // Binary search to find insertion point
    const binarySearch = (startTime) => {
        let low = 0;
        let high = schedule.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (schedule[mid].startTime < startTime) {
                low = mid + 1;
            } else if (schedule[mid].startTime > startTime) {
                high = mid - 1;
            } else {
                return mid; // Found exact match
            }
        }
        return low; // Point of insertion
    }

    infeasibleTasks.forEach(task => {
        let minimumFeasibleTime = task.deadline - task.executionTime;
        let insertionIndex = binarySearch(minimumFeasibleTime);
        task.startTime = minimumFeasibleTime;
        schedule.splice(insertionIndex, 0, task);
    });

    return schedule;
};




module.exports = schedule;
