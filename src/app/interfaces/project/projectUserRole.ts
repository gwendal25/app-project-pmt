import { UserRole } from "../../enums/userRole";

export interface ProjectUserRole {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    userRole: UserRole;
}