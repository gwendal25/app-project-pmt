import { UserRole } from "../../enums/UserRole";

export interface ChangeUserRoleDto {
    userId: number,
    userRole: string
}