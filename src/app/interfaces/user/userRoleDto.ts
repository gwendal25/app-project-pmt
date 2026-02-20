import { UserRole } from "../../enums/userRole";

export interface UserRoleDto {
    id: number,
    name: string,
    email: string,
    role: UserRole
}