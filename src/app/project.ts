import { ProjectTaskInfo } from "./projectTask";

export interface ProjectInfo {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    tasks: Array<ProjectTaskInfo> | null;
}
