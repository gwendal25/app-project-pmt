import { SimpleProjectInfo } from "../project/simpleProject";
import { User } from "../user/user";

export interface ProjectUserDto {
    project: SimpleProjectInfo;
    user: User;
    role: string;
}