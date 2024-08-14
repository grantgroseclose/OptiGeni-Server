interface TaskUserIdDto {
    userId: string;
};

interface TaskCategoryTitleDto {
    categoryTitle: string;
};

interface TaskTitleDto {
    title: string;
};

interface TaskDescriptionDto {
    description: string;
};

interface TaskDeadlineDto {
    deadline: number;
};

interface TaskPriorityDto {
    priority: number;
};

interface TaskExTimeDto {
    executionTime: number;
};

export { TaskTitleDto, TaskDeadlineDto, TaskPriorityDto, TaskExTimeDto, TaskUserIdDto, TaskCategoryTitleDto, TaskDescriptionDto };