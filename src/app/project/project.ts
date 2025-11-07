import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../project-service';
import { SimpleProjectInfo } from '../simpleProject';

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project implements OnInit {
  projectInfoList: SimpleProjectInfo[] = [];
  projectService: ProjectService = inject(ProjectService);

  ngOnInit(): void {
    this.projectService.getAllProjectInfos()
    .subscribe((projects) => {
      this.projectInfoList = projects;
    })
  }
}
