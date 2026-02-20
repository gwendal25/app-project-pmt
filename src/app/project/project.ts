import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../services/project-service';
import { ProjectUserRole } from '../interfaces/project/projectUserRole';

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project implements OnInit {
  projectInfoList: ProjectUserRole[] = [];
  projectService: ProjectService = inject(ProjectService);

  ngOnInit(): void {
    this.projectService.getAllProjectInfosByUser()
    .subscribe((projects) => {
      this.projectInfoList = projects;
    })
  }
}
