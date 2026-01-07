import { UserRoleDto } from "../user/userRoleDto";

export interface ProjectUserRolesDto {
    id: number,
    name: string,
    description: string,
    startDate: Date,
    users: Array<UserRoleDto> | null;
}