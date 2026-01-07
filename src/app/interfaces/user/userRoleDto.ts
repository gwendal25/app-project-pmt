import { UserRole } from "../../enums/UserRole";

export interface UserRoleDto {
    id: number,
    name: string,
    email: string,
    role: UserRole
}