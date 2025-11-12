import { TaskPriority } from "../enums/taskPriority";
import { TaskStatus } from "../enums/taskStatus";
import { TaskHistoryEntryInfo } from "./taskHistoryEntry";

export interface TaskInfo {
    id: number;
    name: string;
    description: string;
    taskPriority: TaskPriority;
    taskStatus: TaskStatus;
    endDate: Date;
    taskHistoryEntries: Array<TaskHistoryEntryInfo> | null;
}