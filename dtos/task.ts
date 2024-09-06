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
    deadline: string;
};

interface TaskUIdDto {
    uId: string;
};

interface TaskStatusDto {
    status: 'Not started' | 'In-progress' | 'Complete'
}

export { TaskTitleDto, TaskDeadlineDto, TaskUserIdDto, TaskCategoryTitleDto, TaskDescriptionDto, TaskUIdDto, TaskStatusDto };