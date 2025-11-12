import { TaskPriority } from "../enums/taskPriority";
import { TaskStatus } from "../enums/taskStatus";

export interface TaskHistoryEntryInfo {
    id: number;
    name: string;
    description: string;
    endDate: Date;
    editDate: Date;
    taskPriority: TaskPriority,
    taskStatus: TaskStatus
}