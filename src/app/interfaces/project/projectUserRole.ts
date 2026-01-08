import { UserRole } from "../../enums/UserRole";

export interface ProjectUserRole {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    userRole: UserRole;
}