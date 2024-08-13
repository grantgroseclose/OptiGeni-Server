interface TaskTitleDto {
    title: string
}

interface TaskDeadlineDto {
    deadline: number
}

interface TaskPriorityDto {
    priority: number
}

interface TaskExTimeDto {
    executionTime: number
}

interface TaskUserIdDto {
    userId: string
}

export { TaskTitleDto, TaskDeadlineDto, TaskPriorityDto, TaskExTimeDto, TaskUserIdDto };