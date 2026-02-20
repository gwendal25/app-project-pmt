import { Component, input } from '@angular/core';
import { ProjectUserRole } from '../interfaces/project/projectUserRole';
import { UserRole } from '../enums/userRole';

@Component({
  selector: 'app-project-card',
  standalone: false,
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  UserRole = UserRole;

  projectInfo = input.required<ProjectUserRole>();

  isAdmin(userRole: UserRole) {
    return userRole === UserRole.ADMIN;
  }

  isMember(userRole: UserRole) {
    return userRole === UserRole.MEMBER;
  }

  isAdminOrMember(userRole: UserRole) {
    return this.isAdmin(userRole) || this.isMember(userRole);
  }
}
