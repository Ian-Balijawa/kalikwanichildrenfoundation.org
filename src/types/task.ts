import { BaseEntity, User } from './common';

export type TaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export type SubTask = BaseEntity & {
    title: string;
    description: string;
    taskId: number;
    deadline: Date;
    startDate: Date;
    endDate: Date;
    storyPoints: number;
    progress: number;
    status: TaskStatus;
};

export type Task = BaseEntity & {
    title: string;
    description: string;
    workPlanId: number;
    deadline: string;
    startDate: string;
    endDate: string;
    subtasks: SubTask[];
    assignedTo?: User;
    storyPoints: number;
    progress: number;
    status: TaskStatus;
};

export type CreateTaskData = {
    title: string;
    description: string;
    workPlanId: number;
    deadline: string;
    assignedToId: number;
    storyPoints: number;
    progress: number;
    status: TaskStatus;
};

export type UpdateTaskData = Partial<CreateTaskData>;
