import { Component, inject, OnInit } from '@angular/core';
import { ProjectInfo } from '../project';
import { ProjectService } from '../project-service';

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project implements OnInit {
  projectInfoList: ProjectInfo[] = [];
  projectService: ProjectService = inject(ProjectService);

  ngOnInit(): void {
    this.projectService.getAllProjectInfos()
    .subscribe((projects) => {
      this.projectInfoList = projects;
    })
  }
}
