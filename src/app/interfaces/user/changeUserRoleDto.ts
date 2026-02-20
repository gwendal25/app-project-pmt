import { UserRole } from "../../enums/userRole";

export interface ChangeUserRoleDto {
    userId: number,
    userRole: string
}