import { Component, inject } from '@angular/core';
import { ProjectInfo } from '../project';
import { ProjectService } from '../project-service';

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project {
  projectInfoList: ProjectInfo[] = [];
  projectService: ProjectService = inject(ProjectService);

  constructor() {
    this.projectInfoList = this.projectService.getAllProjectInfos();
  }
}
