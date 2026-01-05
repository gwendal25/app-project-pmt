import { TaskPriority } from "../../enums/TaskPriority";
import { TaskStatus } from "../../enums/TaskStatus";
import { TaskUser } from "../user/taskUser";

export interface ProjectTaskInfo {
    id: number;
    name: string;
    description: string;
    taskPriority: TaskPriority;
    taskStatus: TaskStatus;
    endDate: Date;
    user: TaskUser;
    notified: boolean;
}