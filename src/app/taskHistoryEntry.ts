import { TaskPriority } from "./enums/taskPriority";
import { TaskStatus } from "./enums/taskStatus";

export interface TaskHistoryEntryInfo {
    id: number;
    name: string;
    description: string;
    endDate: string;
    taskPriority: TaskPriority,
    taskStatus: TaskStatus
}