import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project-service';
import { ProjectInfo } from '../project';

@Component({
  selector: 'app-project-details',
  standalone: false,
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);

  id:number = this.route.snapshot.params['id'];
  projectInfo: ProjectInfo;

  constructor() {
    this.projectInfo = { id: 0, name: "", description: "", startDate: new Date() };
  }

  ngOnInit(): void {
    this.projectService.getProjectInfoById(this.id)
    .subscribe((project) => {
      this.projectInfo = project;
    })
  }
}
