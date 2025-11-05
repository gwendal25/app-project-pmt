import { TaskPriority } from "./enums/taskPriority";
import { TaskStatus } from "./enums/TaskStatus";

export interface TaskInfo {
    id: number;
    name: string;
    description: string;
    taskPriority: TaskPriority;
    taskStatus: TaskStatus;
    endDate: Date;
}