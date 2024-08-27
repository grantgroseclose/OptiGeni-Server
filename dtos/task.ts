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
    deadline: Date;
};

interface TaskPriorityDto {
    priority: number;
};

interface TaskExTimeDto {
    executionTime: number;
};

interface TaskUIdDto {
    uId: string;
};

export { TaskTitleDto, TaskDeadlineDto, TaskPriorityDto, TaskExTimeDto, TaskUserIdDto, TaskCategoryTitleDto, TaskDescriptionDto, TaskUIdDto };