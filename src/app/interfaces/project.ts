import { ProjectTaskInfo } from "./projectTask";
import { User } from "./user";

export interface ProjectInfo {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    tasks: Array<ProjectTaskInfo> | null;
    users: Array<User> | null;
}
