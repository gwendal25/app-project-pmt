import { TaskPriority } from "../enums/TaskPriority";
import { TaskStatus } from "../enums/TaskStatus";

export interface TaskHistoryEntryInfo {
    id: number;
    name: string;
    description: string;
    endDate: Date;
    editDate: Date;
    taskPriority: TaskPriority,
    taskStatus: TaskStatus
}