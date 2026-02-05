import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRole } from '../enums/userRole';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { AddProjectUserDto } from '../interfaces/user/addProjectUserDto';
import { ProjectUserDto } from '../interfaces/projectuser/projectUserDto';

@Component({
  selector: 'app-add-user-to-project-form',
  standalone: false,
  templateUrl: './add-user-to-project-form.html',
  styleUrl: './add-user-to-project-form.scss',
})
export class AddUserToProjectForm implements OnInit {
  private router:Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  private projectService:ProjectService = inject(ProjectService);

  UserRole = UserRole;

  id: number = 0;
  isLoading: boolean = false;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    userRole: new FormControl<UserRole>(UserRole.OBSERVER, Validators.required)
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  submitForm() {
    if(!this.userForm.valid) {
      return;
    }

    this.isLoading = true;
    const email = this.userForm.value.email ?? '';
    const userRole = this.userForm.value.userRole ?? '';
    const addprojectUserDto: AddProjectUserDto = {
      email: email,
      userRole: userRole
    }
    
    this.addUserToProject(addprojectUserDto);    
  }

  addUserToProject(addprojectUserDto: AddProjectUserDto) {
    this.projectService.addUserToProject(this.id, addprojectUserDto)
    .subscribe({
      next: (projectUserDto: ProjectUserDto) => {
        console.log("projectUserDto :");
        console.log(projectUserDto);
        this.router.navigate(['/project-details', this.id]);
      },
      error: () => {
        console.log("Error when addin the user to the project");
        this.isLoading = false;
      }
    })
  }
}
