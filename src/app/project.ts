import { TaskInfo } from "./task";

export interface ProjectInfo {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    tasks: Array<TaskInfo> | null;
}
