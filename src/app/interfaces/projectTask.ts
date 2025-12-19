import { TaskPriority } from "../enums/TaskPriority";
import { TaskStatus } from "../enums/TaskStatus";
import { UserTaskDto } from "./userTaskDto";

export interface ProjectTaskInfo {
    id: number;
    name: string;
    description: string;
    taskPriority: TaskPriority;
    taskStatus: TaskStatus;
    endDate: Date;
    user: UserTaskDto;
}