import { TaskPriority } from "../../enums/taskPriority";
import { TaskStatus } from "../../enums/taskStatus";
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