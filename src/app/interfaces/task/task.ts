import { TaskPriority } from "../../enums/TaskPriority";
import { TaskStatus } from "../../enums/TaskStatus";
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