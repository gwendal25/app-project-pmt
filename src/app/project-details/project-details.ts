import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project-service';
import { ProjectInfo } from '../project';
import { TaskPriority } from '../enums/taskPriority';
import { TaskStatus } from '../enums/TaskStatus';

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
  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;

  constructor() {
    this.projectInfo = { id: 0, name: "", description: "", startDate: new Date(), tasks: null };
  }

  ngOnInit(): void {
    this.projectService.getProjectInfoById(this.id)
    .subscribe((project) => {
      this.projectInfo = project;
    })
  }

  getTaskStatusValue(value: TaskStatus): string {
    return (<any>TaskStatus)[value] ?? "";
  }

  getTaskPriorityValue(value: TaskPriority): string {
    return (<any>TaskPriority)[value] ?? "";
  }
}
