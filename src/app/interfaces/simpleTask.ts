import { TaskPriority } from "../enums/taskPriority";
import { TaskStatus } from "../enums/taskStatus";

export interface SimpleTaskInfo {
    id: number;
    name: string;
    description: string;
    taskPriority: TaskPriority;
    taskStatus: TaskStatus;
    endDate: Date;
}