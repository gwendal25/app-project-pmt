import { ProjectTaskInfo } from "../task/projectTask";
import { User } from "../user/user";

export interface ProjectInfo {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    tasks: Array<ProjectTaskInfo> | null;
    users: Array<User> | null;
}
