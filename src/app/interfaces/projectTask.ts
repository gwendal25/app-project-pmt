import { TaskPriority } from "../enums/taskPriority";
import { TaskStatus } from "../enums/taskStatus";

export interface ProjectTaskInfo {
    id: number;
    name: string;
    description: string;
    taskPriority: TaskPriority;
    taskStatus: TaskStatus;
    endDate: Date;
}