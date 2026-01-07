import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { ProjectUserRolesDto } from '../interfaces/project/projectUserRolesDto';
import { UserRole } from '../enums/UserRole';
import { MatSelectChange } from '@angular/material/select';
import { UserRoleDto } from '../interfaces/user/userRoleDto';
import { ChangeUserRoleDto } from '../interfaces/user/changeUserRoleDto';
import { ProjectUserDto } from '../interfaces/projectuser/projectUserDto';

@Component({
  selector: 'app-users-roles-form',
  standalone: false,
  templateUrl: './users-roles-form.html',
  styleUrl: './users-roles-form.scss',
})
export class UsersRolesForm implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);

  UserRole = UserRole;

  id: number = 0;
  projectInfo: ProjectUserRolesDto;

  constructor() {
    this.projectInfo = { id: 0, name: "", description: "", startDate: new Date(), users: null };
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.projectService.getProjectInfoWithUserRolesById(this.id)
    .subscribe((project) => {
      this.projectInfo = project;
      this.projectInfo.users = this.projectInfo.users ?? [];
    })
  }

  getUserRoleValue(value: UserRole): string {
    return (<any>UserRole)[value] ?? "";
  }

  assignRole(userId: number, event: MatSelectChange) {
    if(event.value === null || event.value === undefined) {
      return;
    }
    let userRole:string = event.value;
    console.log("User role :");
    console.log(userRole);
    let userRoleDto: ChangeUserRoleDto = { userId: userId, userRole: userRole };
    this.projectService.changeUserRole(this.id, userRoleDto)
    .subscribe({
      next: (projectUserDto: ProjectUserDto) => {
        console.log(`successfully changed role :`);
        console.log(projectUserDto);
      }
    })
  }
}
