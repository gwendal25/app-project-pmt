import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project-service';
import { ProjectInfo } from '../project';

@Component({
  selector: 'app-project-details',
  standalone: false,
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService = inject(ProjectService);
  projectInfo: ProjectInfo | undefined;

  constructor() {
    const projectId = this.route.snapshot.params['id'];
    this.projectInfo = this.projectService.getProjectInfoById(projectId);
  }
}
