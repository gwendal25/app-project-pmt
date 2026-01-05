import { TaskPriority } from "../../enums/TaskPriority";
import { TaskStatus } from "../../enums/TaskStatus";

export interface SimpleTaskInfo {
    id: number;
    name: string;
    description: string;
    taskPriority: TaskPriority;
    taskStatus: TaskStatus;
    endDate: Date;
}